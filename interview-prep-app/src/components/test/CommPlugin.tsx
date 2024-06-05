import { Extension, CommandProps, Editor, Range } from "@tiptap/react";
import { ReactRenderer } from "@tiptap/react";
import tippy, { Instance } from "tippy.js";

import { Suggestion } from "@tiptap/suggestion";
import { SuggestionProps } from "@tiptap/suggestion";

/**
 * A function that is called when a suggestion is selected.
 * @param props The props object.
 * @param props.editor The editor instance.
 * @param props.range The range of the suggestion.
 * @param props.props The props of the selected suggestion.
 * @returns void
 * @example ({ editor, range, props }) => { props.command(props.props) }
 */
//   command?: (props: {
//     editor: Editor;
//     range: Range;
//     props: I;
// }) => void;

const CommandsPlugin = Extension.create({
  name: "insertMenu",
  addProseMirrorPlugins() {
    return [
      Suggestion<CommandProps>({
        editor: this.editor,
        char: "/",
        command: ({ editor, range, props }) => {
          // execute the item's command
        },

        items: ({ query }) => {
          return (
            [
              {
                title: "Heading",
                attrs: {
                  "data-test-id": "insert-heading1",
                },
                command: ({ editor }: { editor: Editor }) => {
                  const selection = editor.view.state.selection;
                  const from = selection.$from.posAtIndex(0);
                  const to = selection.$from.posAtIndex(1);
                  editor
                    .chain()
                    .focus()
                    .deleteRange({ from, to })
                    .setNode("heading", { level: 1 })
                    .run();
                },
              },
              {
                title: "Subheading",
                attrs: {
                  "data-test-id": "insert-heading2",
                },
                command: ({ editor }: { editor: Editor }) => {
                  const selection = editor.view.state.selection;
                  const from = selection.$from.posAtIndex(0);
                  const to = selection.$from.posAtIndex(1);
                  editor
                    .chain()
                    .focus()
                    .deleteRange({ from, to })
                    .setNode("heading", { level: 2 })
                    .run();
                },
              },
              {
                title: "Small Subheading",
                attrs: {
                  "data-test-id": "insert-heading3",
                },
                command: ({ editor }: { editor: Editor }) => {
                  const selection = editor.view.state.selection;
                  const from = selection.$from.posAtIndex(0);
                  const to = selection.$from.posAtIndex(1);
                  editor
                    .chain()
                    .focus()
                    .deleteRange({ from, to })
                    .setNode("heading", { level: 3 })
                    .run();
                },
              },
              {
                title: "Quote",
                attrs: {
                  "data-test-id": "insert-quote",
                },
                command: ({
                  editor,
                  range,
                }: {
                  editor: Editor;
                  range: Range;
                }) => {
                  const selection = editor.view.state.selection;
                  const from = selection.$from.posAtIndex(0);
                  const to = selection.$from.posAtIndex(1);
                  editor
                    .chain()
                    .focus()
                    .deleteRange({ from, to })
                    .setBlockquote()
                    .run();
                },
              },
              {
                title: "Bullet List",
                attrs: {
                  "data-test-id": "insert-bullet-list",
                },
                command: ({
                  editor,
                  range,
                }: {
                  editor: Editor;
                  range: Range;
                }) => {
                  const selection = editor.view.state.selection;
                  const from = selection.$from.posAtIndex(0);
                  const to = selection.$from.posAtIndex(1);
                  editor
                    .chain()
                    .focus()
                    .deleteRange({ from, to })
                    .toggleBulletList()
                    .run();
                },
              },
              {
                title: "Numbered List",
                attrs: {
                  "data-test-id": "insert-ordered-list",
                },
                command: ({
                  editor,
                  range,
                }: {
                  editor: Editor;
                  range: Range;
                }) => {
                  const selection = editor.view.state.selection;
                  const from = selection.$from.posAtIndex(0);
                  const to = selection.$from.posAtIndex(1);
                  editor
                    .chain()
                    .focus()
                    .deleteRange({ from, to })
                    .toggleOrderedList()
                    .run();
                },
              },
              {
                title: "Code Block",
                attrs: {
                  "data-test-id": "insert-code",
                },
                command: ({
                  editor,
                  range,
                }: {
                  editor: Editor;
                  range: Range;
                }) => {
                  const selection = editor.view.state.selection;
                  const from = selection.$from.posAtIndex(0);
                  const to = selection.$from.posAtIndex(1);
                  editor
                    .chain()
                    .focus()
                    .deleteRange({ from, to })
                    .setCodeBlock()
                    .run();
                },
              },
              {
                title: "Callout",
                attrs: {
                  "data-test-id": "insert-callout",
                },
                command: ({
                  editor,
                  range,
                }: {
                  editor: Editor;
                  range: Range;
                }) => {
                  const selection = editor.view.state.selection;
                  const from = selection.$from.posAtIndex(0);
                  const to = selection.$from.posAtIndex(1);
                  editor
                    .chain()
                    .focus()
                    .deleteRange({ from, to })
                    .setCallout()
                    .run();
                },
              },
              {
                title: "Image",
                attrs: {
                  "data-test-id": "insert-image",
                },
                command: ({
                  editor,
                  range,
                }: {
                  editor: Editor;
                  range: Range;
                }) => {
                  const selection = editor.view.state.selection;
                  const from = selection.$from.posAtIndex(0);
                  const to = selection.$from.posAtIndex(1);
                  editor
                    .chain()
                    .focus()
                    .deleteRange({ from, to })
                    .insertContentAt(from, { type: "imagePlaceholder" })
                    .run();
                },
              },
              {
                title: "Video",
                attrs: {
                  "data-test-id": "insert-video",
                },
                command: ({
                  editor,
                  range,
                }: {
                  editor: Editor;
                  range: Range;
                }) => {
                  const selection = editor.view.state.selection;
                  const from = selection.$from.posAtIndex(0);
                  const to = selection.$from.posAtIndex(1);
                  editor
                    .chain()
                    .focus()
                    .deleteRange({ from, to })
                    .insertContentAt(from, { type: "videoPlaceholder" })
                    .run();
                },
              },
            ] as CommandProps[]
          )
            .filter((item) => {
              return item.title.toLowerCase().startsWith(query.toLowerCase());
            })
            .slice(0, 10);
        },
        startOfLine: true,
        allow: ({ state, range, editor }) => {
          const node = state.selection.$from.node();
          if (!node) return false;
          return node.textBetween(0, 1) === "/";
        },
        render: () => {
          let component: ReactRenderer<CommandsView, any>, popup: Instance<any>;
          return {
            onStart: (props) => {
              component = new ReactRenderer(CommandsView, {
                props,
                editor: props.editor,
              });
              popup = tippy(props.editor.options.element, {
                getReferenceClientRect:
                  props.clientRect as GetReferenceClientRect,
                content: component.element,
                showOnCreate: true,
                interactive: true,
                trigger: "manual",
                placement: "bottom-start",
              });
            },
            onUpdate: (props) => {
              component.updateProps(props);
              popup.setProps({
                getReferenceClientRect: props.clientRect,
              });
            },
            onKeyDown: ({ event }) => {
              if (event.key === "Escape") {
                popup.hide();
                return true;
              }
              if (component.ref)
                return component.ref.onKeyDown(event as KeyboardEvent);
              else return true;
            },
            onExit: () => {
              component.destroy();
              popup.destroy();
            },
          };
        },
      }),
    ];
  },
});

export default CommandsPlugin;
