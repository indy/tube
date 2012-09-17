define([], function() {

  // [line, direction, ... [connected segments]]  
  var northern = [
    "Northern", 
    {cssName: "northern",
     colour: "#000000"},

    { // morden -> kennington
      direction: "Northbound", 
      opposingDirection: "Southbound to Morden", 
      connections: [327, 447, 116, 498, 497, 18, 110, 106, 109, 467, 366, 268]
    },
    { // kennington -> euston (via charing cross)
      direction: "Northbound via Charing Cross", 
      opposingDirection: "Southbound to Morden via Charing Cross", 
      connections: [268, 531, 166, 93, 296, 499, 199, 529, 175]
    },
    { // kennington -> euston (via bank)
      direction: "Northbound via Bank", 
      opposingDirection: "Southbound to Morden via Bank", 
      connections: [268, 159, 52, 304, 19, 326, 363, 12, 284, 175]
    },
    { // euston -> mornington crescent->camden town
      direction: "Northbound via Mornington Crescent", 
      opposingDirection: "Southbound via Mornington Crescent", 
      connections: [175, 329, 76]
    },
    { // euston -> camden town
      direction: "Northbound", 
      opposingDirection: "Southbound", 
      connections: [175, 76]
    },
    { // camden town -> edgware
      direction: "Northbound to Edgware", 
      opposingDirection: "Southbound", 
      connections: [76, 91, 37, 219, 197, 58, 240, 115, 70, 155]
    },
    { // camden town -> high barnet
      direction: "Northbound to High Barnet", 
      opposingDirection: "Southbound", 
      connections: [76, 273, 504, 14, 247, 149, 184, 543, 576, 501, 243]
    },
    { // finchley central -> mill hill east
      direction: "Northbound to Mill Hill East", 
      opposingDirection: "Southbound", 
      connections: [184, 321]
    } 
  ];

  var victoria = [
    "Victoria",
    {cssName: "victoria",
     colour: "#0092cb"},
    {
      direction: "Northbound", 
      opposingDirection: "Southbound", 
      connections: [61, 467, 517, 378, 518, 206, 367, 529, 175, 284, 246, 187, 423, 500, 49, 521]
    }];

  var piccadilly = [
    "Piccadilly", 
    {cssName: "piccadilly",
     colour: "#223080"},
    {  // cockfosters -> acton town
      direction: "Westbound", 
      opposingDirection: "Eastbound", 
      connections: [114, 362, 452, 15, 54, 571, 508, 312, 187, 16, 252, 72, 284, 419, 250, 118, 296, 377, 206, 261, 287, 441, 196, 144, 27, 218, 507, 3]
    },
    {  // acton town -> uxbridge
      direction: "Westbound to Uxbridge", 
      opposingDirection: "Eastbound", 
      connections: [3, 143, 347, 370, 9, 480, 478, 440, 401, 153, 418, 416, 262, 248, 516]
    },
    { // acton town -> heathrow
      direction: "Westbound to Heathrow", 
      opposingDirection: "Eastbound", 
      connections: [3, 438, 352, 53, 365, 259, 258, 260, 233, 239]
    },
    { // hatton cross -> heathrow terminal 4 -> terminals 1,2,3
      direction: "via Heathrow Terminal 4", 
      opposingDirection: "Eastbound", 
      connections: [233, 238, 239]
    } 
  ];

  var central = [
    "Central", 
    {cssName: "central",
     colour: "#ee000a"},
    {  // west ruislip -> north acton
      direction: "Eastbound ", 
      opposingDirection: "Westbound to West Ruislip", 
      connections: [551, 417, 445, 353, 207, 375, 224, 345]
    },
    {                           // ealing broadway -> north acton
      direction: "Eastbound", 
      opposingDirection: "Westbound to Ealing Broadway", 
      connections: [142, 537, 345]
    },
    {  // north acton -> leytonstone
      direction: "Eastbound to Leytonstone", 
      opposingDirection: "Westbound", 
      connections: [345, 146, 559, 425, 251, 359, 396, 292, 315, 51, 367, 499, 250, 92, 462, 19, 303, 41, 319, 471, 298, 300]
    },
    {  // leytonston -> epping
      direction: "Eastbound to Epping", 
      opposingDirection: "Westbound", 
      connections: [300, 434, 448, 573, 69, 308, 134, 493, 171]
    },
    { // leytonston -> woodford via Hainault
      direction: "Woodford via Hainault", 
      opposingDirection: "Leytonstone via Hainault", 
      connections: [300, 526, 404, 193, 342, 23, 179, 216, 203, 100, 410, 573]
    } 
  ];

  var bakerloo = [
    "Bakerloo",
    {cssName: "bakerloo",
     colour: "#a85303"},
    {
      direction: "Northbound", 
      opposingDirection: "Southbound", 
      connections: [159, 291, 531, 166, 93, 377, 367, 406, 17, 317, 156, 368, 530, 310, 281, 392, 269, 566, 226, 469, 534, 351, 442, 275, 230]
    }];


  var jubilee = [
    "Jubilee",
    {cssName: "jubilee",
     colour: "#8a9293"},
    { 
      direction: "Southbound", 
      opposingDirection: "Northbound", 
      connections: [465, 82, 394, 285, 535, 334, 139, 565, 279, 545, 185, 486, 461, 17, 51, 206, 558, 531, 453, 304, 39, 77, 78, 348, 79, 544, 471]
    }];


  var dlr = [
    "DLR",
    {cssName: "dlr",
     colour: "#8ddad4"},
    {  // beckton -> canning town
      direction: "Westbound", 
      opposingDirection: "Eastbound to Beckton", 
      connections: [32, 192, 128, 33, 413, 386, 126, 415, 79]
    },
    {  // woolwich arsenal -> canning town
      direction: "Westbound", 
      opposingDirection: "Eastbound to Woolwich Arsenal", 
      connections: [577, 282, 305, 383, 552, 79]
    },
    {  // canning town -> stratford international
      direction: "Northbound to Stratford International", 
      opposingDirection: "Southbound", 
      connections: [79, 544, 471, 472]
    },
    {  // lewisham -> stratford
      direction: "Northbound to Stratford", 
      opposingDirection: "Southbound to Lewisham", 
      connections: [297, 165, 137, 208, 127, 265, 333, 122, 444, 242, 78, 548, 384, 8, 293, 138, 55, 387, 471]
    },
    {  // bow church -> bow road
      direction: "To Bow Road", 
      opposingDirection: "To Bow Church", 
      connections: [55, 56]
    },
    {  // west india quay -> westferry
      direction: "West India Quay to Westferry", 
      opposingDirection: "Westferry to West India Quay", 
      connections: [548, 557]
    },
    {  // canning town -> bank
      direction: "Westbound to Bank", 
      opposingDirection: "Eastbound", 
      connections: [79, 151, 50, 384, 557, 302, 424, 19]
    },
    { // shadwell -> tower gateway
      direction: "Westbound to Tower Gateway", 
      opposingDirection: "Eastbound", 
      connections: [424, 502]
    } 
  ];

  var metropolitan = [
    "Metropolitan",
    {cssName: "metropolitan",
     colour: "#91004f"},
    {  // aldgate -> Harrow on the Hill
      direction: "Westbound", 
      opposingDirection: "Eastbound", 
      connections: [5, 303, 326, 21, 181, 284, 176, 205, 17, 185, 535, 385, 355, 231]
    },
    {  // Harrow-on-the-hill -> uxbridge
      direction: "Westbound to Uxbridge", 
      opposingDirection: "Eastbound", 
      connections: [231, 547, 401, 153, 418, 416, 262, 248, 516]
    },
    {  // harrow on the hill -> amersham
      direction: "Westbound to Amersham", 
      opposingDirection: "Eastbound", 
      connections: [231, 349, 379, 357, 356, 325, 408, 104, 90, 10]
    },
    { // chalfont and latimer -> chesham
      direction: "Westbound to Chesham", 
      opposingDirection: "Eastbound", 
      connections: [90, 97]
    },
    { // moor park -> watford
      direction: "Westbound to Watford", 
      opposingDirection: "Eastbound", 
      connections: [325, 124, 532]
    } 
  ];

  var circle = [
    "Circle",
    {cssName: "circle",
     colour: "#ffd000"},
    {                     // edgware road -> hammersmith
      direction: "Westbound", 
      opposingDirection: "Eastbound", 
      connections: [157, 368, 29, 359, 244, 196, 441, 432, 518, 460, 558, 166, 491, 47, 314, 80, 324, 503, 5, 303, 326, 21, 181, 284, 176, 205, 17, 157, 368, 414, 555, 289, 294, 426, 198, 218]
    } 
  ];

  var hammersmith = [
    "Hammersmith and City",
    {cssName: "hammersmith-and-city",
     colour: "#f86f93"},
    { // barking -> hammersmith
      direction: "Westbound", 
      opposingDirection: "Eastbound", 
      connections: [22, 150, 515, 380, 544, 65, 56, 55, 466, 561, 6, 303, 326, 21, 181, 284, 176, 205, 17, 157, 368, 414, 555, 289, 294, 426, 198, 218]
    } 
  ];

  var waterloo = [
    "Waterloo and City",
    {cssName: "waterloo-and-city",
     colour: "#6bccaf"}, 
    { // bank -> waterloo
      direction: "Southbound to Waterloo", 
      opposingDirection: "Northbound to Bank", 
      connections: [19, 531]
    } 
  ];

  var district = [
    "District",
    {cssName: "district",
     colour: "#00823a"},
    {   // upminster -> gloucester road
      direction: "Westbound", 
      opposingDirection: "Eastbound", 
      connections: [510, 511, 255, 160, 130, 131, 34, 512, 22, 150, 515, 380, 544, 65, 56, 55, 466, 561, 6, 503, 324, 80, 314, 47, 491, 166, 558, 460, 518, 432, 441, 196]
    },

    {   // gloucester road ->ealing broadway
      direction: "Westbound to Ealing Broadway", 
      opposingDirection: "Eastbound", 
      connections: [196, 144, 549, 27, 217, 400, 463, 507, 103, 3, 143, 142]
    },
    { // turnham green -> richmond
      direction: "Westbound to Richmond", 
      opposingDirection: "Eastbound", 
      connections: [507, 210, 277, 407]
    },
    { // earls court -> wimbledon
      direction: "Southbound to Wimbledon", 
      opposingDirection: "Northbound to Earl's Court", 
      connections: [144, 538, 190, 371, 391, 152, 451, 569, 567]
    },
    { // gloucester road->edgware road
      direction: "Northbound to Edgware Road", 
      opposingDirection: "Southbound to Gloucester Road", 
      connections: [196, 244, 359, 29, 368, 157]
    },
    { // high street kensington -> earls court
      direction: "Westbound to Earl's Court", 
      opposingDirection: "Eastbound to High Street Kensington", 
      connections: [244, 144]
    } 
  ];

  return [northern, 
          victoria, 
          piccadilly,
          central,
          bakerloo,
          jubilee,
          dlr,
          metropolitan,
          circle,
          hammersmith,
          waterloo,
          district];
});
