import {
  Editor,
  isNodeSelection,
  isTextSelection,
  posToDOMRect,
} from "@tiptap/core";
import { EditorState, Plugin, PluginKey } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import tippy, { Instance, Props } from "tippy.js";

/** Defines the configuration properties for the BubbleMenuPlugin.
 * @param pluginKey     Unique key for the plugin.
 * @param editor        TipTap editor instance.
 * @param element       HTML element to be used as the bubble menu.
 * @param tippyOptions  Optional configuration for the tippy.js tooltip.
 * @param shouldShow    Optional function to determine when to show the menu
 *
 *  Plugin Props Interface for Extension List
 */
export interface BubbleMenuPluginProps {
  pluginKey: PluginKey | string;
  editor: Editor;
  element: HTMLElement;
  tippyOptions?: Partial<Props>;
  shouldShow?:
    | ((props: {
        editor: Editor;
        view: EditorView;
        state: EditorState;
        oldState?: EditorState;
        from: number;
        to: number;
      }) => boolean)
    | null;
}

/**
 * React Render Bubble Menu View Type: Bubble Plugin Props & Editor View
 */
export type BubbleMenuViewProps = BubbleMenuPluginProps & {
  view: EditorView;
};
/**
 * @class - Responsible for managing the bubble menu's behavior and appearance.
 */
export class BubbleMenuView {
  public editor: Editor;

  public element: HTMLElement;

  public view: EditorView;

  public preventHide = false;

  public tippy: Instance | undefined;

  public tippyOptions?: Partial<Props>;

  public shouldShow: Exclude<BubbleMenuPluginProps["shouldShow"], null> = ({
    view,
    state,
    from,
    to,
  }) => {
    const { doc, selection } = state;
    const { empty } = selection;

    // Sometime check for `empty` is not enough.
    // Doubleclick an empty paragraph returns a node size of 2.
    // So we check also for an empty text size.
    const isEmptyTextBlock =
      !doc.textBetween(from, to).length && isTextSelection(state.selection);

    if (!view.hasFocus() || empty || isEmptyTextBlock) {
      return false;
    }

    return true;
  };

  /**
   * @constructor Initializes class properties, sets up event listeners.
   * Detaches the menu element from its current parent and makes it visible.
   *
   * Event listeners:
   * - @event `mousedown` on element: Prevents the menu from hiding when clicking on it.
   * - @event `dragstart` on view.dom: Hides the menu when dragging starts.
   * - @event `focus` on editor: Updates the menu position when the editor gains focus.
   * - @event `blur` on editor: Hides the menu when the editor loses focus.
   *
   */
  constructor({
    editor,
    element,
    view,
    tippyOptions = {},
    shouldShow,
  }: BubbleMenuViewProps) {
    this.editor = editor;
    this.element = element;
    this.view = view;

    if (shouldShow) {
      this.shouldShow = shouldShow;
    }

    this.element.addEventListener("mousedown", this.mousedownHandler, {
      capture: true,
    });
    this.view.dom.addEventListener("dragstart", this.dragstartHandler);
    this.editor.on("focus", this.focusHandler);
    // this.editor.on("blur", this.blurHandler);
    this.tippyOptions = tippyOptions;
    // Detaches menu content from its current parent
    this.element.remove();
    this.element.style.visibility = "visible";
  }

  /**
   * Prevents the menu from hiding when clicking on it.
   */
  mousedownHandler = () => {
    this.preventHide = true;
  };

  /**
   * Hides the menu when dragging starts.
   */
  dragstartHandler = () => {
    this.hide();
  };

  /**
   * Updates the menu position when the editor gains focus.
   */
  focusHandler = () => {
    // we use `setTimeout` to make sure `selection` is already updated
    setTimeout(() => this.update(this.editor.view));
  };

  /**
   * Hides the menu when the editor loses focus.
   * @param {Object} event - The focus event.
   */
  blurHandler = ({ event }: { event: FocusEvent }) => {
    if (this.preventHide) {
      this.preventHide = false;

      return;
    }

    if (
      event?.relatedTarget &&
      this.element.parentNode?.contains(event.relatedTarget as Node)
    ) {
      return;
    }

    this.hide();
  };

  /**
   * Determines whether the menu should be shown based on the selection and updates its position.
   * @param {EditorView} view - The editor view.
   * @param {EditorState} [oldState] - The old editor state.
   */
  updateHandler = (view: EditorView, oldState?: EditorState) => {
    const { state, composing } = view;
    const { selection } = state;

    console.log("updated");

    if (composing) return;

    this.createTooltip();

    // support for CellSelections
    const { ranges } = selection;
    const from = Math.min(...ranges.map((range) => range.$from.pos));
    const to = Math.max(...ranges.map((range) => range.$to.pos));

    const shouldShow = this.shouldShow?.({
      editor: this.editor,
      view,
      state,
      oldState,
      from,
      to,
    });

    if (!shouldShow) {
      this.hide();

      return;
    }

    this.tippy?.setProps({
      getReferenceClientRect:
        this.tippyOptions?.getReferenceClientRect ||
        (() => {
          if (isNodeSelection(state.selection)) {
            const node = view.nodeDOM(from) as HTMLElement;

            if (node) {
              return node.getBoundingClientRect();
            }
          }

          return posToDOMRect(view, from, to);
        }),
    });

    this.show();
  };

  /**
   * Creates the tippy.js tooltip.
   */
  createTooltip() {
    const { element: editorElement } = this.editor.options;
    const editorIsAttached = !!editorElement.parentElement;

    if (this.tippy || !editorIsAttached) {
      return;
    }

    this.tippy = tippy(editorElement, {
      duration: 0,
      getReferenceClientRect: null,
      content: this.element,
      interactive: true,
      trigger: "manual",
      placement: "top",
      hideOnClick: "toggle",
      ...this.tippyOptions,
    });

    // maybe we have to hide tippy on its own blur event as well
    if (this.tippy.popper.firstChild) {
      (this.tippy.popper.firstChild as HTMLElement).addEventListener(
        "blur",
        (event) => {
          this.blurHandler({ event });
        }
      );
    }
  }

  /**
   * Updates the menu position with a delay.
   * @param {EditorView} view - The editor view.
   * @param {EditorState} [oldState] - The old editor state.
   */
  update(view: EditorView, oldState?: EditorState) {
    setTimeout(() => {
      this.updateHandler(view, oldState);
    }, 250);
  }

  /**
   * Shows the menu.
   */
  show() {
    this.tippy?.show();
  }

  /**
   * Hides the menu.
   */
  hide() {
    this.tippy?.hide();
  }

  /**
   * Cleans up event listeners and destroys the tooltip.
   */
  destroy() {
    this.tippy?.destroy();
    this.element.removeEventListener("mousedown", this.mousedownHandler, {
      capture: true,
    });
    this.view.dom.removeEventListener("dragstart", this.dragstartHandler);

    this.editor.off("focus", this.focusHandler);
    // this.editor.off("blur", this.blurHandler);
  }
}

export const BubbleMenuPlugin = (options: BubbleMenuPluginProps) => {
  return new Plugin({
    key:
      typeof options.pluginKey === "string"
        ? new PluginKey(options.pluginKey)
        : options.pluginKey,
    view: (view) => new BubbleMenuView({ view, ...options }),
  });
};
