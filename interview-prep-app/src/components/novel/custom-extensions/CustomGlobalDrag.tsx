import { GlobalDragHandle } from "novel/extensions";
import React, {
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useRef,
  useLayoutEffect,
} from "react";
import { Editor, Range, Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import { ReactRenderer } from "@tiptap/react";
import { useCompletion } from "ai/react";
import tippy from "tippy.js";

import LoadingCircle from "@/components/ui/icons/loading-circle";
import { toast } from "sonner";
import va from "@vercel/analytics";
import Magic from "@/components/ui/icons/magic";
import { suggestionItems } from "./suggestion-items";
import { Node as ProseMirrorNode } from "@tiptap/core";
import { PluginKey } from "prosemirror-state";

interface Command {
  editor: Editor;
  range: Range;
}

interface CommandItemProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const CustomGlobalDragHandle = GlobalDragHandle.extend({
  addNodeView() {
    return (node: any, view: any, getPos: any, decorations: any) => {
      const dom = document.getElementById("drag-handle");

      // Add a click event listener
      dom!.addEventListener("click", () => {
        console.log("Drag handle clicked");
      });

      return {
        dom,
        contentDOM: dom,
        update: (updatedNode: any) => {
          if (updatedNode.type !== node.type) return false;
          return true;
        },
      };
    };
  },
  addOptions() {
    return {
      suggestion: {
        char: "/",
        command: ({
          editor,
          range,
          props,
        }: {
          editor: Editor;
          range: Range;
          props: any;
        }) => {
          props.command({ editor, range });
        },
      },
    };
  },
});

/**
 * Adjusts the scroll position of a container element to ensure a selected item is visible.
 * @param container
 * @param item
 */
export const updateScrollView = (container: HTMLElement, item: HTMLElement) => {
  const containerHeight = container.offsetHeight;
  const itemHeight = item ? item.offsetHeight : 0;

  const top = item.offsetTop;
  const bottom = top + itemHeight;

  if (top < container.scrollTop) {
    container.scrollTop -= container.scrollTop - top + 5;
  } else if (bottom > containerHeight + container.scrollTop) {
    container.scrollTop += bottom - containerHeight - container.scrollTop + 5;
  }
};

/**
 * Command List component - Displays a list of command items as a dropdown menu.
 * @param items
 * @param command
 * @param editor
 * @param range
 * @constructor
 */
const CommandList = ({
  items,
  command,
  editor,
  range,
}: {
  items: CommandItemProps[];
  command: any;
  editor: any;
  range: any;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { complete, isLoading } = useCompletion({
    id: "novel",
    api: "/api/generate",
    onResponse: (response) => {
      if (response.status === 429) {
        toast.error("You have reached your request limit for the day.");
        va.track("Rate Limit Reached");
        return;
      }
      editor.chain().focus().deleteRange(range).run();
    },
    onFinish: (_prompt, completion) => {
      // highlight the generated text
      editor.commands.setTextSelection({
        from: range.from,
        to: range.from + completion.length,
      });
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
  });

  /**
   * Memoizes the selectItem function.
   */
  const selectItem = useCallback(
    (index: number) => {
      const item = items[index];
      va.track("Slash Command Used", {
        command: item.title,
      });
      if (item) {
        if (item.title === "Continue writing") {
          const text = editor.getText();
          complete(text);
        } else {
          command(item);
        }
      }
    },
    [complete, command, editor, items]
  );

  /**
   *  Handles keyboard navigation and resets the selected index when items change.
   */
  useEffect(() => {
    const navigationKeys = ["ArrowUp", "ArrowDown", "Enter"];
    const onKeyDown = (e: KeyboardEvent) => {
      if (navigationKeys.includes(e.key)) {
        e.preventDefault();
        if (e.key === "ArrowUp") {
          setSelectedIndex((selectedIndex + items.length - 1) % items.length);
          return true;
        }
        if (e.key === "ArrowDown") {
          setSelectedIndex((selectedIndex + 1) % items.length);
          return true;
        }
        if (e.key === "Enter") {
          selectItem(selectedIndex);
          return true;
        }
        return false;
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [items, selectedIndex, setSelectedIndex, selectItem]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  // References the command list container.
  const commandListContainer = useRef<HTMLDivElement>(null);

  /**
   * Click to choose the command from '/' command list
   * @param e Mouse Click event
   * @param index Chosen Command index via click
   */
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, index: any) => {
    e.preventDefault();
    // console.log("COMMAND CLICKED", selectedIndex, items[selectedIndex]);
    selectItem(index);
  };

  /**
   *  Ensures the selected item is scrolled into view.
   */
  useLayoutEffect(() => {
    const container = commandListContainer?.current;

    const item = container?.children[selectedIndex] as HTMLElement;

    if (item && container) updateScrollView(container, item);
  }, [selectedIndex]);

  return items.length > 0 ? (
    <div
      id='slash-command'
      ref={commandListContainer}
      className='z-50 h-auto max-h-[330px] w-72 overflow-y-auto scroll-smooth rounded-md border border-stone-200 bg-white px-1 py-2 shadow-md transition-all'
    >
      {items.map((item: CommandItemProps, index: number) => {
        return (
          <button
            className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm text-stone-900 hover:bg-stone-100 ${
              index === selectedIndex ? "bg-stone-100 text-stone-900" : ""
            }`}
            key={index}
            // onClick={() => selectItem(index)}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              handleClick(e, index)
            }
          >
            <div className='flex h-10 w-10 items-center justify-center rounded-md border border-stone-200 bg-white'>
              {item.title === "Continue writing" && isLoading ? (
                <LoadingCircle />
              ) : (
                item.icon
              )}
            </div>
            <div>
              <p className='font-medium'>{item.title}</p>
              <p className='text-xs text-stone-500'>{item.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  ) : null;
};

/**
 * Function for suggestion items that handles their display and behavior in the dropdown menu.
 * @returns
 */
const renderItems = () => {
  let component: ReactRenderer | null = null;
  let popup: any | null = null;

  return {
    onStart: (props: { editor: Editor; clientRect: DOMRect }) => {
      component = new ReactRenderer(CommandList, {
        props,
        editor: props.editor,
      });

      // @ts-ignore
      popup = tippy("body", {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
      });
    },
    onUpdate: (props: { editor: Editor; clientRect: DOMRect }) => {
      component?.updateProps(props);

      popup &&
        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
    },
    onKeyDown: (props: { event: KeyboardEvent }) => {
      if (props.event.key === "Escape") {
        popup?.[0].hide();

        return true;
      }

      // @ts-ignore
      return component?.ref?.onKeyDown(props);
    },
    onExit: () => {
      popup?.[0].destroy();
      component?.destroy();
    },
  };
};

const CustomGlobalDrag = CustomGlobalDragHandle.configure({
  suggestion: {
    items: suggestionItems,
    render: renderItems,
  },
});

export default CustomGlobalDrag;
// Create a separate extension with node view wrapper
