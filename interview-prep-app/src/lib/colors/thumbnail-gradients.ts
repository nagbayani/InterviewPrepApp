interface Gradient {
  name: string;
  style: string;
}

const gradients: Gradient[] = [
  // Red
  {
    name: "Love Kiss",
    style: "linear-gradient(to top, #ff0844 0%, #ffb199 100%)",
  },
  {
    name: "Strong Bliss",
    style:
      "linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)",
  },
  {
    name: "Red Code",
    style:
      "linear-gradient(107.2deg, rgb(150, 15, 15) 10.6%, rgb(247, 0, 0) 91.1%)",
  },

  // Strong Orange
  {
    name: "Phoenix Start",
    style: "linear-gradient(to right, #f83600 0%, #f9d423 100%)",
  },
  {
    name: "Sunny Morning",
    style: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
  },
  {
    name: "Orange Juice",
    style: "linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%)",
  },

  // Light Orange
  {
    name: "Juicy Peach",
    style: "linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)",
  },
  {
    name: "Gentle Care",
    style: "linear-gradient(to right, #ffc3a0 0%, #ffafbd 100%)",
  },

  // Strong Green
  {
    name: "Green Beach",
    style: "linear-gradient(to top, #02aab0 0%, #00cdac 100%)",
  },
  {
    name: "Grown Early",
    style: "linear-gradient(to top, #0ba360 0%, #3cba92 100%)",
  },
  {
    name: "Tempting Azure",
    style: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
  },
  {
    name: "Dusty Grass",
    style: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
  },

  // Light Green
  {
    name: "Soft Grass",
    style: "linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)",
  },
  {
    name: "Over Sun",
    style: "linear-gradient(60deg, #abecd6 0%, #fbed96 100%)",
  },

  // Strong Blue
  {
    name: "Malibu Beach",
    style: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
  },
  {
    name: "Morpheus Den",
    style: "linear-gradient(to top, #30cfd0 0%, #330867 100%)",
  },
  {
    name: "Sharp Blues",
    style: "linear-gradient(to top, #00c6fb 0%, #005bea 100%)",
  },
  {
    name: "Sky Glider",
    style: "linear-gradient(to top, #00c6fb 0%, #005bea 100%)",
  },

  // Light Blue
  {
    name: "Winter Neva",
    style: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
  },
  {
    name: "Deep Blue",
    style: "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)",
  },

  // Brown
  {
    name: "Cheerful Caramel",
    style: "linear-gradient(to top, #e6b980 0%, #eacda3 100%)",
  },
  {
    name: "Desert Hump",
    style: "linear-gradient(to top, #c79081 0%, #dfa579 100%)",
  },
  {
    name: "Dark Brown",
    style: "linear-gradient(315deg, #000000 0%, #422419 74%)",
  },
  {
    name: "Immigration Way",
    style: "linear-gradient(315deg, #e0d2b4 0%, #e2ac6b 74%)",
  },
  {
    name: "Coffee Gold",
    style: "linear-gradient(315deg, #907ad6 0%, #d65db1 74%)",
  },
  {
    name: "Expensive Hat",
    style: "linear-gradient(315deg, #bc6f03 0%, #874000 74%)",
  },

  // Grey
  {
    name: "Kind Steel",
    style: "linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)",
  },
  {
    name: "Clean Mirror",
    style: "linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)",
  },
  {
    name: "Jungle Day",
    style: "linear-gradient(45deg, #8baaaa 0%, #ae8b9c 100%)",
  },
  {
    name: "Gagarin View",
    style: "linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%)",
  },

  // Purple
  {
    name: "Purple Division",
    style: "linear-gradient(to top, #7028e4 0%, #e5b2ca 100%)",
  },
  {
    name: "Night Fade",
    style: "linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%)",
  },
  {
    name: "Teen Notebook",
    style: "linear-gradient(to top, #9795f0 0%, #fbc8d4 100%)",
  },
  {
    name: "Wild Apple",
    style: "linear-gradient(to top, #d299c2 0%, #fef9d7 100%)",
  },

  // Pink
  {
    name: "Lady Lips",
    style: "linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
  },
  {
    name: "Fresh Milk",
    style: "linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
  },
  {
    name: "Child Care",
    style: "linear-gradient(-20deg, #f794a4 0%, #fdd6bd 100%)",
  },

  // Other
  {
    name: "Rare Wind",
    style: "linear-gradient(to top, #30cfd0 0%, #330867 100%)",
  },
  {
    name: "Smiling Rain",
    style: "linear-gradient(-20deg, #dcb0ed 0%, #99c99c 100%)",
  },
  {
    name: "Strong Stick",
    style: "linear-gradient(to right, #a8caba 0%, #5d4157 100%)",
  },
  {
    name: "Frozen Berry",
    style: "linear-gradient(to top, #e8198b 0%, #c7eafd 100%)",
  },
  {
    name: "Magic Lake",
    style: "linear-gradient(to top, #d5dee7 0%, #ffafbd 0%, #c9ffbf 100%)",
  },
  {
    name: "Soft Cherish",
    style:
      "linear-gradient(to top, #dbdcd7 0%, #dddcd7 24%, #e2c9cc 30%, #e7627d 46%, #b8235a 59%, #801357 71%, #3d1635 84%, #1c1a27 100%)",
  },
];

export default gradients;
