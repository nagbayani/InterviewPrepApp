// export const defaultValue = {
//   type: "doc",
//   content: [
//     {
//       type: "paragraph",
//       content: [
//         {
//           type: "text",
//           text: "",
//         },
//       ],
//     },
//   ],
// };

export const defaultValue = {
  type: "doc",
  content: [
    {
      type: "dBlock", // Use dBlock as the main block type
      content: [
        {
          type: "paragraph", // Inside dBlock, include an empty paragraph
          content: [
            {
              type: "text",
              text: "",
            },
          ],
        },
      ],
    },
  ],
};
