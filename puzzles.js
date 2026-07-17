/*
 * puzzles.js
 * ----------
 * A hardcoded bank of "seed groups" for the Kid Connections game.
 *
 * Each group is a single hidden theme plus exactly THREE tiles that belong to
 * it. A playable puzzle is built at runtime by picking three groups that do
 * not share any tiles, shuffling their nine tiles into a 3x3 grid, and asking
 * the player to find each group.
 *
 * These were generated with the help of an LLM and are intentionally simple:
 * concrete, everyday words for ages 5-9, with no tricky wordplay.
 *
 * Shape of a group:
 *   { theme: "Farm Animals", emoji: "🐄", tiles: ["Cow", "Pig", "Horse"] }
 *
 * `emoji` is optional and only used to decorate the solved-group reveal.
 */

const GROUPS = [
  // ---- Animals ----
  { theme: "Farm Animals", emoji: "🐄", tiles: ["Cow", "Pig", "Horse"] },
  { theme: "Pets", emoji: "🐶", tiles: ["Dog", "Cat", "Hamster"] },
  { theme: "Jungle Animals", emoji: "🦁", tiles: ["Lion", "Tiger", "Monkey"] },
  { theme: "Ocean Animals", emoji: "🐋", tiles: ["Whale", "Shark", "Dolphin"] },
  { theme: "Sea Creatures", emoji: "🐙", tiles: ["Crab", "Octopus", "Jellyfish"] },
  { theme: "Birds", emoji: "🦉", tiles: ["Robin", "Owl", "Eagle"] },
  { theme: "Farm Birds", emoji: "🐔", tiles: ["Chicken", "Goose", "Turkey"] },
  { theme: "Bugs", emoji: "🐞", tiles: ["Ant", "Bee", "Ladybug"] },
  { theme: "Creepy Crawlies", emoji: "🕷️", tiles: ["Spider", "Worm", "Beetle"] },
  { theme: "Pond Animals", emoji: "🐸", tiles: ["Frog", "Turtle", "Newt"] },
  { theme: "Big Animals", emoji: "🐘", tiles: ["Elephant", "Giraffe", "Hippo"] },
  { theme: "Small Animals", emoji: "🐭", tiles: ["Mouse", "Rabbit", "Squirrel"] },
  { theme: "Reptiles", emoji: "🦎", tiles: ["Snake", "Lizard", "Crocodile"] },
  { theme: "Zoo Animals", emoji: "🦓", tiles: ["Zebra", "Panda", "Kangaroo"] },
  { theme: "Baby Animals", emoji: "🐤", tiles: ["Puppy", "Kitten", "Chick"] },
  { theme: "Farm Babies", emoji: "🐑", tiles: ["Calf", "Lamb", "Foal"] },
  { theme: "Dinosaurs", emoji: "🦕", tiles: ["T-Rex", "Raptor", "Stego"] },
  { theme: "Arctic Animals", emoji: "🐧", tiles: ["Penguin", "Seal", "Walrus"] },
  { theme: "Woodland Animals", emoji: "🦊", tiles: ["Fox", "Deer", "Badger"] },
  { theme: "Bears", emoji: "🐻", tiles: ["Grizzly", "Polar", "Panda"] },
  { theme: "Fast Animals", emoji: "🐆", tiles: ["Cheetah", "Horse", "Hare"] },
  { theme: "Slow Animals", emoji: "🐌", tiles: ["Snail", "Sloth", "Tortoise"] },
  { theme: "Pond Birds", emoji: "🦆", tiles: ["Duck", "Swan", "Heron"] },
  { theme: "Animals with Horns", emoji: "🦏", tiles: ["Goat", "Rhino", "Bull"] },
  { theme: "Jumping Animals", emoji: "🦘", tiles: ["Frog", "Rabbit", "Grasshopper"] },
  { theme: "Furry Pets", emoji: "🐹", tiles: ["Guinea Pig", "Gerbil", "Ferret"] },

  // ---- Fruits & Veggies ----
  { theme: "Fruits", emoji: "🍎", tiles: ["Apple", "Banana", "Grape"] },
  { theme: "More Fruits", emoji: "🍑", tiles: ["Peach", "Pear", "Plum"] },
  { theme: "Berries", emoji: "🍓", tiles: ["Strawberry", "Blueberry", "Raspberry"] },
  { theme: "Tropical Fruits", emoji: "🥭", tiles: ["Mango", "Pineapple", "Coconut"] },
  { theme: "Melons", emoji: "🍉", tiles: ["Watermelon", "Cantaloupe", "Honeydew"] },
  { theme: "Citrus Fruits", emoji: "🍋", tiles: ["Lemon", "Lime", "Grapefruit"] },
  { theme: "Vegetables", emoji: "🥕", tiles: ["Carrot", "Potato", "Onion"] },
  { theme: "Green Veggies", emoji: "🥦", tiles: ["Broccoli", "Peas", "Spinach"] },
  { theme: "Salad Veggies", emoji: "🥗", tiles: ["Lettuce", "Cucumber", "Tomato"] },
  { theme: "Root Veggies", emoji: "🥔", tiles: ["Beet", "Radish", "Turnip"] },
  { theme: "Squash", emoji: "🎃", tiles: ["Pumpkin", "Zucchini", "Gourd"] },
  { theme: "Crunchy Veggies", emoji: "🌽", tiles: ["Corn", "Celery", "Pepper"] },

  // ---- Food & Drink ----
  { theme: "Breakfast Foods", emoji: "🍳", tiles: ["Eggs", "Toast", "Cereal"] },
  { theme: "Sweet Treats", emoji: "🍪", tiles: ["Cake", "Cookie", "Candy"] },
  { theme: "Cold Treats", emoji: "🍦", tiles: ["Ice Cream", "Popsicle", "Sherbet"] },
  { theme: "Drinks", emoji: "🥛", tiles: ["Milk", "Juice", "Water"] },
  { theme: "Fast Food", emoji: "🍔", tiles: ["Burger", "Fries", "Hot Dog"] },
  { theme: "Snacks", emoji: "🍿", tiles: ["Chips", "Pretzel", "Popcorn"] },
  { theme: "Dinner Foods", emoji: "🍝", tiles: ["Pasta", "Rice", "Soup"] },
  { theme: "Pizza Toppings", emoji: "🍕", tiles: ["Cheese", "Pepperoni", "Mushroom"] },
  { theme: "Baked Goods", emoji: "🥐", tiles: ["Bread", "Muffin", "Bagel"] },
  { theme: "Sandwich Fillings", emoji: "🥪", tiles: ["Ham", "Turkey", "Jam"] },
  { theme: "Party Foods", emoji: "🎂", tiles: ["Cupcake", "Pretzels", "Balloons"] },
  { theme: "Warm Drinks", emoji: "☕", tiles: ["Cocoa", "Tea", "Cider"] },
  { theme: "Candy", emoji: "🍬", tiles: ["Lollipop", "Gumdrop", "Chocolate"] },
  { theme: "Dairy", emoji: "🧀", tiles: ["Cheese", "Yogurt", "Butter"] },

  // ---- Colors ----
  { theme: "Colors", emoji: "🔴", tiles: ["Red", "Blue", "Green"] },
  { theme: "Bright Colors", emoji: "🟡", tiles: ["Yellow", "Purple", "Pink"] },
  { theme: "Dark Colors", emoji: "⚫", tiles: ["Black", "Brown", "Gray"] },
  { theme: "Rainbow Colors", emoji: "🌈", tiles: ["Indigo", "Violet", "Teal"] },
  { theme: "Warm Colors", emoji: "🟠", tiles: ["Crimson", "Amber", "Gold"] },
  { theme: "Cool Colors", emoji: "🔵", tiles: ["Navy", "Aqua", "Mint"] },

  // ---- Shapes ----
  { theme: "Shapes", emoji: "🔺", tiles: ["Circle", "Square", "Triangle"] },
  { theme: "Fun Shapes", emoji: "⭐", tiles: ["Star", "Heart", "Diamond"] },
  { theme: "More Shapes", emoji: "🔷", tiles: ["Oval", "Rectangle", "Hexagon"] },

  // ---- Numbers ----
  { theme: "Small Numbers", emoji: "1️⃣", tiles: ["One", "Two", "Three"] },
  { theme: "Middle Numbers", emoji: "5️⃣", tiles: ["Four", "Five", "Six"] },
  { theme: "Bigger Numbers", emoji: "9️⃣", tiles: ["Seven", "Eight", "Nine"] },
  { theme: "Counting by Tens", emoji: "🔟", tiles: ["Ten", "Twenty", "Thirty"] },

  // ---- Body ----
  { theme: "On Your Face", emoji: "👃", tiles: ["Eyes", "Nose", "Mouth"] },
  { theme: "Body Parts", emoji: "💪", tiles: ["Arm", "Leg", "Back"] },
  { theme: "On Your Hand", emoji: "✋", tiles: ["Finger", "Thumb", "Palm"] },
  { theme: "On Your Foot", emoji: "🦶", tiles: ["Toe", "Heel", "Ankle"] },
  { theme: "On Your Head", emoji: "👂", tiles: ["Hair", "Ear", "Chin"] },

  // ---- Nature & Weather ----
  { theme: "Weather", emoji: "🌧️", tiles: ["Rain", "Snow", "Wind"] },
  { theme: "In the Sky", emoji: "☁️", tiles: ["Cloud", "Sun", "Rainbow"] },
  { theme: "At Night", emoji: "🌙", tiles: ["Moon", "Star", "Comet"] },
  { theme: "Seasons", emoji: "🍂", tiles: ["Spring", "Summer", "Winter"] },
  { theme: "In the Garden", emoji: "🌷", tiles: ["Flower", "Bush", "Vine"] },
  { theme: "Flowers", emoji: "🌸", tiles: ["Rose", "Tulip", "Daisy"] },
  { theme: "Trees", emoji: "🌳", tiles: ["Oak", "Pine", "Maple"] },
  { theme: "Rocks & Ground", emoji: "🪨", tiles: ["Sand", "Mud", "Pebble"] },
  { theme: "Water Places", emoji: "🌊", tiles: ["Lake", "River", "Ocean"] },
  { theme: "Big Landforms", emoji: "⛰️", tiles: ["Mountain", "Hill", "Valley"] },
  { theme: "Stormy Weather", emoji: "⛈️", tiles: ["Thunder", "Lightning", "Hail"] },
  { theme: "Cold Things", emoji: "❄️", tiles: ["Ice", "Frost", "Icicle"] },

  // ---- Vehicles ----
  { theme: "Vehicles", emoji: "🚗", tiles: ["Car", "Truck", "Bus"] },
  { theme: "Things That Fly", emoji: "✈️", tiles: ["Plane", "Helicopter", "Rocket"] },
  { theme: "Water Vehicles", emoji: "⛵", tiles: ["Boat", "Ship", "Canoe"] },
  { theme: "Trains", emoji: "🚆", tiles: ["Train", "Tram", "Subway"] },
  { theme: "Things with Two Wheels", emoji: "🚲", tiles: ["Bike", "Scooter", "Motorcycle"] },
  { theme: "Emergency Vehicles", emoji: "🚑", tiles: ["Ambulance", "Fire Truck", "Police Car"] },
  { theme: "Big Machines", emoji: "🚜", tiles: ["Tractor", "Digger", "Crane"] },
  { theme: "Construction Trucks", emoji: "🚧", tiles: ["Bulldozer", "Dump Truck", "Cement Mixer"] },

  // ---- School ----
  { theme: "School Supplies", emoji: "✏️", tiles: ["Pencil", "Eraser", "Crayon"] },
  { theme: "In the Classroom", emoji: "🏫", tiles: ["Desk", "Board", "Chair"] },
  { theme: "Reading Things", emoji: "📚", tiles: ["Book", "Page", "Story"] },
  { theme: "Art Supplies", emoji: "🎨", tiles: ["Paint", "Brush", "Glue"] },
  { theme: "Writing Tools", emoji: "🖊️", tiles: ["Pen", "Marker", "Chalk"] },
  { theme: "School Subjects", emoji: "🧮", tiles: ["Math", "Science", "Reading"] },

  // ---- Home ----
  { theme: "Rooms in a House", emoji: "🏠", tiles: ["Kitchen", "Bedroom", "Bathroom"] },
  { theme: "Furniture", emoji: "🛋️", tiles: ["Chair", "Table", "Sofa"] },
  { theme: "In the Kitchen", emoji: "🍽️", tiles: ["Plate", "Cup", "Bowl"] },
  { theme: "Silverware", emoji: "🍴", tiles: ["Fork", "Knife", "Spoon"] },
  { theme: "In the Bathroom", emoji: "🛁", tiles: ["Soap", "Towel", "Toothbrush"] },
  { theme: "In the Bedroom", emoji: "🛏️", tiles: ["Bed", "Pillow", "Blanket"] },
  { theme: "Cleaning Tools", emoji: "🧹", tiles: ["Broom", "Mop", "Sponge"] },
  { theme: "Things with Doors", emoji: "🚪", tiles: ["Fridge", "Oven", "Closet"] },
  { theme: "Lights", emoji: "💡", tiles: ["Lamp", "Candle", "Flashlight"] },
  { theme: "Kitchen Appliances", emoji: "🍞", tiles: ["Toaster", "Blender", "Microwave"] },

  // ---- Clothes ----
  { theme: "Clothes", emoji: "👕", tiles: ["Shirt", "Pants", "Dress"] },
  { theme: "Warm Clothes", emoji: "🧣", tiles: ["Coat", "Scarf", "Mittens"] },
  { theme: "On Your Feet", emoji: "👟", tiles: ["Shoes", "Socks", "Boots"] },
  { theme: "On Your Head", emoji: "🧢", tiles: ["Hat", "Cap", "Helmet"] },
  { theme: "Rainy Day Gear", emoji: "☔", tiles: ["Umbrella", "Raincoat", "Galoshes"] },
  { theme: "Pajamas & Sleep", emoji: "🥱", tiles: ["Pajamas", "Robe", "Slippers"] },

  // ---- Toys & Play ----
  { theme: "Toys", emoji: "🧸", tiles: ["Ball", "Doll", "Blocks"] },
  { theme: "Outdoor Play", emoji: "🪁", tiles: ["Kite", "Jump Rope", "Frisbee"] },
  { theme: "Board Games", emoji: "🎲", tiles: ["Checkers", "Cards", "Dice"] },
  { theme: "Playground", emoji: "🛝", tiles: ["Slide", "Swing", "Seesaw"] },
  { theme: "Building Toys", emoji: "🧱", tiles: ["Legos", "Bricks", "Magnets"] },
  { theme: "Water Play", emoji: "🫧", tiles: ["Bubbles", "Squirt Gun", "Splash"] },

  // ---- Music ----
  { theme: "Instruments", emoji: "🥁", tiles: ["Drum", "Guitar", "Piano"] },
  { theme: "More Instruments", emoji: "🎺", tiles: ["Flute", "Violin", "Trumpet"] },
  { theme: "Music Words", emoji: "🎵", tiles: ["Song", "Beat", "Tune"] },

  // ---- Sports ----
  { theme: "Ball Sports", emoji: "⚽", tiles: ["Soccer", "Basketball", "Baseball"] },
  { theme: "Sports Gear", emoji: "🧤", tiles: ["Bat", "Glove", "Net"] },
  { theme: "Water Sports", emoji: "🏊", tiles: ["Swimming", "Diving", "Surfing"] },
  { theme: "Winter Sports", emoji: "⛷️", tiles: ["Skiing", "Skating", "Sledding"] },
  { theme: "Things You Kick", emoji: "🦵", tiles: ["Soccer Ball", "Can", "Pebble"] },

  // ---- People ----
  { theme: "Family", emoji: "👨‍👩‍👧", tiles: ["Mom", "Dad", "Baby"] },
  { theme: "More Family", emoji: "👵", tiles: ["Sister", "Brother", "Grandma"] },
  { theme: "Community Helpers", emoji: "🚒", tiles: ["Doctor", "Teacher", "Firefighter"] },
  { theme: "More Jobs", emoji: "👨‍🍳", tiles: ["Chef", "Pilot", "Farmer"] },
  { theme: "Health Helpers", emoji: "🩺", tiles: ["Nurse", "Dentist", "Vet"] },
  { theme: "Fairy Tale People", emoji: "👑", tiles: ["King", "Queen", "Prince"] },

  // ---- Fantasy ----
  { theme: "Magic People", emoji: "🧙", tiles: ["Wizard", "Witch", "Fairy"] },
  { theme: "Storybook Creatures", emoji: "🐉", tiles: ["Dragon", "Unicorn", "Mermaid"] },
  { theme: "Spooky Things", emoji: "👻", tiles: ["Ghost", "Monster", "Goblin"] },
  { theme: "Superhero Words", emoji: "🦸", tiles: ["Cape", "Mask", "Hero"] },

  // ---- Space ----
  { theme: "In Space", emoji: "🚀", tiles: ["Rocket", "Astronaut", "Alien"] },
  { theme: "Planets", emoji: "🪐", tiles: ["Earth", "Mars", "Saturn"] },
  { theme: "Space Sights", emoji: "☄️", tiles: ["Comet", "Galaxy", "Meteor"] },

  // ---- Around Town ----
  { theme: "Places to Go", emoji: "🏞️", tiles: ["Park", "Zoo", "Beach"] },
  { theme: "Buildings", emoji: "🏢", tiles: ["Store", "Library", "Hospital"] },
  { theme: "On the Road", emoji: "🚦", tiles: ["Stop Sign", "Crosswalk", "Traffic Light"] },
  { theme: "At the Farm", emoji: "🚜", tiles: ["Barn", "Silo", "Field"] },
  { theme: "At the Beach", emoji: "🏖️", tiles: ["Shell", "Sandcastle", "Wave"] },
  { theme: "At the Circus", emoji: "🎪", tiles: ["Clown", "Tent", "Acrobat"] },

  // ---- Bath & Bedtime ----
  { theme: "Bath Time", emoji: "🛀", tiles: ["Bubbles", "Rubber Duck", "Washcloth"] },
  { theme: "Bedtime", emoji: "😴", tiles: ["Teddy", "Nightlight", "Lullaby"] },

  // ---- Actions ----
  { theme: "Ways to Move", emoji: "🏃", tiles: ["Run", "Jump", "Hop"] },
  { theme: "Quiet Actions", emoji: "🤫", tiles: ["Sleep", "Read", "Whisper"] },
  { theme: "Loud Actions", emoji: "📣", tiles: ["Shout", "Clap", "Stomp"] },
  { theme: "Kitchen Actions", emoji: "🥄", tiles: ["Stir", "Bake", "Chop"] },
  { theme: "Water Actions", emoji: "💦", tiles: ["Splash", "Swim", "Float"] },
  { theme: "Face Actions", emoji: "😄", tiles: ["Smile", "Wink", "Yawn"] },

  // ---- Descriptions ----
  { theme: "Big Words", emoji: "🐘", tiles: ["Huge", "Giant", "Large"] },
  { theme: "Small Words", emoji: "🐜", tiles: ["Tiny", "Little", "Small"] },
  { theme: "Happy Words", emoji: "😊", tiles: ["Glad", "Cheerful", "Joyful"] },
  { theme: "Fast & Slow", emoji: "🐢", tiles: ["Quick", "Speedy", "Slow"] },
  { theme: "Temperature Words", emoji: "🌡️", tiles: ["Hot", "Cold", "Warm"] },
  { theme: "Feeling Words", emoji: "🥰", tiles: ["Happy", "Sad", "Sleepy"] },

  // ---- Holidays & Fun ----
  { theme: "Birthday Party", emoji: "🎉", tiles: ["Balloons", "Presents", "Candles"] },
  { theme: "Halloween", emoji: "🎃", tiles: ["Pumpkin", "Costume", "Spider"] },
  { theme: "Winter Holidays", emoji: "🎄", tiles: ["Snowman", "Sleigh", "Ornament"] },
  { theme: "Rainy Day Fun", emoji: "🌂", tiles: ["Puddle", "Splash", "Boots"] },
  { theme: "Camping", emoji: "🏕️", tiles: ["Tent", "Campfire", "Marshmallow"] },

  // ---- Sounds ----
  { theme: "Animal Sounds", emoji: "🔊", tiles: ["Moo", "Oink", "Baa"] },
  { theme: "Loud Sounds", emoji: "💥", tiles: ["Bang", "Boom", "Crash"] },
  { theme: "Soft Sounds", emoji: "🤫", tiles: ["Hush", "Purr", "Hum"] },

  // ---- Time ----
  { theme: "Days & Time", emoji: "📅", tiles: ["Today", "Tomorrow", "Yesterday"] },
  { theme: "Times of Day", emoji: "🌅", tiles: ["Morning", "Noon", "Night"] },
  { theme: "Months", emoji: "🗓️", tiles: ["June", "July", "August"] },

  // ---- Opposites-ish / misc concrete ----
  { theme: "Things in the Sky", emoji: "🎈", tiles: ["Balloon", "Kite", "Bird"] },
  { theme: "Sticky Things", emoji: "🍯", tiles: ["Honey", "Glue", "Syrup"] },
  { theme: "Round Things", emoji: "⚽", tiles: ["Ball", "Orange", "Wheel"] },
  { theme: "Things That Light Up", emoji: "🔦", tiles: ["Firefly", "Star", "Lantern"] },
  { theme: "Things with Wings", emoji: "🦋", tiles: ["Butterfly", "Bat", "Bird"] },
  { theme: "Things That Bounce", emoji: "🏀", tiles: ["Rubber Ball", "Kangaroo", "Trampoline"] },
  { theme: "Things You Wear", emoji: "🧦", tiles: ["Glasses", "Watch", "Ring"] },
  { theme: "Things That Spin", emoji: "🌀", tiles: ["Top", "Fan", "Windmill"] },
  { theme: "Soft Things", emoji: "☁️", tiles: ["Pillow", "Feather", "Cotton"] },
  { theme: "Hard Things", emoji: "🪨", tiles: ["Rock", "Brick", "Metal"] },
  { theme: "Things That Grow", emoji: "🌱", tiles: ["Seed", "Sprout", "Plant"] },
  { theme: "Things in a Toolbox", emoji: "🔨", tiles: ["Hammer", "Screwdriver", "Wrench"] },
  { theme: "Things in a Backpack", emoji: "🎒", tiles: ["Lunchbox", "Notebook", "Water Bottle"] },
  { theme: "Things in the Garden", emoji: "🪴", tiles: ["Shovel", "Watering Can", "Rake"] },

  // ---- Occupations gear ----
  { theme: "Doctor Things", emoji: "🩹", tiles: ["Bandage", "Thermometer", "Stethoscope"] },
  { theme: "Chef Things", emoji: "🍳", tiles: ["Apron", "Pot", "Whisk"] },
  { theme: "Pirate Things", emoji: "🏴‍☠️", tiles: ["Treasure", "Parrot", "Map"] },
  { theme: "Farm Tools", emoji: "🌾", tiles: ["Plow", "Hoe", "Wheelbarrow"] },

  // ---- More animals for variety ----
  { theme: "Animals with Shells", emoji: "🐚", tiles: ["Snail", "Turtle", "Clam"] },
  { theme: "Striped Animals", emoji: "🐅", tiles: ["Tiger", "Zebra", "Bee"] },
  { theme: "Spotted Animals", emoji: "🐆", tiles: ["Leopard", "Dalmatian", "Ladybug"] },
  { theme: "Animals That Hop", emoji: "🐰", tiles: ["Bunny", "Kangaroo", "Frog"] },
  { theme: "Animals That Swim", emoji: "🐟", tiles: ["Fish", "Duck", "Otter"] },
  { theme: "Night Animals", emoji: "🦇", tiles: ["Owl", "Bat", "Raccoon"] },
  { theme: "Desert Animals", emoji: "🐫", tiles: ["Camel", "Lizard", "Scorpion"] },
  { theme: "Rainforest Animals", emoji: "🦜", tiles: ["Parrot", "Toucan", "Jaguar"] },

  // ---- More food ----
  { theme: "Things on a Sandwich", emoji: "🥬", tiles: ["Lettuce", "Cheese", "Ham"] },
  { theme: "Soup Ingredients", emoji: "🍲", tiles: ["Noodles", "Broth", "Veggies"] },
  { theme: "Taco Fillings", emoji: "🌮", tiles: ["Beans", "Cheese", "Salsa"] },
  { theme: "Ice Cream Flavors", emoji: "🍨", tiles: ["Vanilla", "Chocolate", "Strawberry"] },
  { theme: "Things You Bake", emoji: "🧁", tiles: ["Cookies", "Brownies", "Muffins"] },
  { theme: "Picnic Foods", emoji: "🧺", tiles: ["Sandwiches", "Watermelon", "Lemonade"] },

  // ---- Misc places / things ----
  { theme: "At the Doctor", emoji: "🏥", tiles: ["Waiting Room", "Checkup", "Shot"] },
  { theme: "At the Grocery Store", emoji: "🛒", tiles: ["Cart", "Aisle", "Checkout"] },
  { theme: "Things in the Ocean", emoji: "🐠", tiles: ["Coral", "Seaweed", "Starfish"] },
  { theme: "Things in a Nest", emoji: "🪺", tiles: ["Egg", "Twig", "Chick"] },
  { theme: "Things That Are Cold", emoji: "🧊", tiles: ["Snowball", "Ice Cube", "Popsicle"] },
  { theme: "Things That Are Hot", emoji: "🔥", tiles: ["Fire", "Sun", "Stove"] },
  { theme: "Things That Float", emoji: "🛟", tiles: ["Bubble", "Raft", "Leaf"] },
  { theme: "Things That Fall", emoji: "🍁", tiles: ["Rain", "Leaves", "Snow"] },
  { theme: "Loud Instruments", emoji: "🎷", tiles: ["Cymbals", "Tuba", "Trombone"] },
  { theme: "Quiet Things", emoji: "🔇", tiles: ["Whisper", "Feather", "Snowflake"] },

  // ---- Feelings / faces ----
  { theme: "Silly Faces", emoji: "🤪", tiles: ["Silly", "Goofy", "Funny"] },
  { theme: "Scared Words", emoji: "😱", tiles: ["Scared", "Nervous", "Jumpy"] },
  { theme: "Sleepy Words", emoji: "😪", tiles: ["Tired", "Drowsy", "Yawny"] },

  // ---- Textures / materials ----
  { theme: "Made of Wood", emoji: "🪵", tiles: ["Log", "Stick", "Plank"] },
  { theme: "Made of Paper", emoji: "📄", tiles: ["Card", "Newspaper", "Napkin"] },
  { theme: "Made of Glass", emoji: "🪟", tiles: ["Window", "Mirror", "Jar"] },

  // ---- Ocean & water more ----
  { theme: "On a Boat", emoji: "⚓", tiles: ["Sail", "Anchor", "Oar"] },
  { theme: "At the Pool", emoji: "🏊", tiles: ["Float", "Goggles", "Diving Board"] },

  // ---- Extra everyday sets ----
  { theme: "Things with Buttons", emoji: "🎮", tiles: ["Remote", "Shirt", "Elevator"] },
  { theme: "Things with Wheels", emoji: "🛞", tiles: ["Wagon", "Stroller", "Skateboard"] },
  { theme: "Things You Open", emoji: "🎁", tiles: ["Gift", "Jar", "Door"] },
  { theme: "Things You Ride", emoji: "🎠", tiles: ["Pony", "Bike", "Carousel"] },
  { theme: "Things That Ring", emoji: "🔔", tiles: ["Bell", "Phone", "Alarm"] },
  { theme: "Things You Blow", emoji: "🎈", tiles: ["Whistle", "Bubbles", "Balloon"] },
  { theme: "Things You Squeeze", emoji: "🧴", tiles: ["Sponge", "Lemon", "Ketchup"] },
  { theme: "Things You Fold", emoji: "🧺", tiles: ["Laundry", "Paper", "Map"] },
];

// Make available to the game code (and to Node if ever needed for testing).
if (typeof module !== "undefined" && module.exports) {
  module.exports = { GROUPS };
}
