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
import {
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  MessageSquarePlus,
  Text,
  TextQuote,
  Image as ImageIcon,
  Code,
} from "lucide-react";
import LoadingCircle from "@/components/ui/icons/loading-circle";
import { toast } from "sonner";
import va from "@vercel/analytics";
import Magic from "@/components/ui/icons/magic";
import { handleImageUpload } from "@/components/novel/image";

interface CommandItemProps {
  title: string;
  description: string;
  icon: ReactNode;
}

interface Command {
  editor: Editor;
  range: Range;
}

const Command = Extension.create({
  name: "slash-command",
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
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

const suggestionItems = ({ query }: { query: string }) => {
  return [
    {
      title: "Insert Paragraph Below",
      description: "Insert a new paragraph below the current one.",
      icon: <Text size={18} />,
      command: ({ editor, range }: Command) => {
        const endPos = range.to;

        editor.commands.focus("start");

        editor
          .chain()
          .insertContentAt(endPos, { type: "paragraph" })
          .focus(endPos)
          .selectNodeForward()
          .scrollIntoView()
          .run();
      },
    },
    {
      title: "Continue writing",
      description: "Use AI to expand your thoughts.",
      icon: <Magic className='w-7 text-black' />,
    },
    {
      title: "Send Feedback",
      description: "Let us know how we can improve.",
      icon: <MessageSquarePlus size={18} />,
      command: ({ editor, range }: Command) => {
        editor.chain().focus().deleteRange(range).run();
        window.open("/feedback", "_blank");
      },
    },
    {
      title: "Text",
      description: "Just start typing with plain text.",
      icon: <Text size={18} />,
      command: ({ editor, range }: Command) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleNode("paragraph", "paragraph")
          .run();
      },
    },
    {
      title: "Heading 1",
      description: "Big section heading.",
      icon: <Heading1 size={18} />,
      command: ({ editor, range }: Command) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 1 })
          .run();
      },
    },
    {
      title: "Heading 2",
      description: "Medium section heading.",
      icon: <Heading2 size={18} />,
      command: ({ editor, range }: Command) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 2 })
          .run();
      },
    },
    {
      title: "Heading 3",
      description: "Small section heading.",
      icon: <Heading3 size={18} />,
      command: ({ editor, range }: Command) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 3 })
          .run();
      },
    },
    {
      title: "Bullet List",
      description: "Create a simple bullet list.",
      icon: <List size={18} />,
      command: ({ editor, range }: Command) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      },
    },
    {
      title: "Numbered List",
      description: "Create a list with numbering.",
      icon: <ListOrdered size={18} />,
      command: ({ editor, range }: Command) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run();
      },
    },
    {
      title: "Quote",
      description: "Capture a quote.",
      icon: <TextQuote size={18} />,
      command: ({ editor, range }: Command) =>
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleNode("paragraph", "paragraph")
          .toggleBlockquote()
          .run(),
    },
    {
      title: "Code",
      description: "Capture a code snippet.",
      icon: <Code size={18} />,
      command: ({ editor, range }: Command) =>
        editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
    },
    {
      title: "Image",
      description: "Upload an image from your computer.",
      icon: <ImageIcon size={18} />,
      command: ({ editor, range }: Command) => {
        editor.chain().focus().deleteRange(range).run();
        // upload image
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = async (event) => {
          if (input.files?.length) {
            const file = input.files[0];
            return handleImageUpload(file, editor.view, event);
          }
        };
        input.click();
      },
    },
  ].filter((item) => {
    if (typeof query === "string" && query.length > 0) {
      return item.title.toLowerCase().includes(query.toLowerCase());
    }
    return true;
  });
};

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

const SlashCommand = Command.configure({
  suggestion: {
    items: suggestionItems,
    render: renderItems,
  },
});

export default SlashCommand;