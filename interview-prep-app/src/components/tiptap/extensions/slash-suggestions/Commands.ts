import { Extension, Editor, Range } from "@tiptap/react";

import Suggestion from "@tiptap/suggestion";
/**
 * Commands Extension
 */
const Commands = Extension.create({
  name: "slasher",

  addOptions() {
    return {
      suggestions: {
        char: "/",
        command: ({ editor, range, props }: any) =>
          props.command({ editor, range }),
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestions,
      }),
    ];
  },
});

export default Commands;
