/*
 * puzzles.js
 * ----------
 * A hardcoded bank of "seed groups" for the Kid Connections game.
 *
 * Each group is a single hidden theme plus FOUR tiles that belong to it.
 * A playable puzzle is built at runtime by picking N groups that do not share
 * any tile, sampling N tiles from each, and shuffling them into an NxN grid:
 *   - 3x3 (easy grid): 3 groups, 3 of each group's 4 tiles.
 *   - 4x4 (big grid):  4 groups, all 4 tiles.
 *
 * These were generated with the help of an LLM and are intentionally simple:
 * concrete, everyday words for ages 5-9, with no tricky wordplay.
 *
 * Shape of a group:
 *   { theme: "Farm Animals", emoji: "🐄", tiles: ["Cow", "Pig", "Horse", "Sheep"] }
 *
 * `emoji` is optional and only used to decorate the solved-group reveal.
 */

const GROUPS = [
  // ---- Animals ----
  { theme: "Farm Animals", emoji: "🐄", tiles: ["Cow", "Pig", "Horse", "Sheep"] },
  { theme: "Pets", emoji: "🐶", tiles: ["Dog", "Cat", "Hamster", "Fish"] },
  { theme: "Jungle Animals", emoji: "🦁", tiles: ["Lion", "Tiger", "Monkey", "Gorilla"] },
  { theme: "Ocean Animals", emoji: "🐋", tiles: ["Whale", "Shark", "Dolphin", "Stingray"] },
  { theme: "Sea Creatures", emoji: "🐙", tiles: ["Crab", "Octopus", "Jellyfish", "Lobster"] },
  { theme: "Birds", emoji: "🦉", tiles: ["Robin", "Owl", "Eagle", "Sparrow"] },
  { theme: "Farm Birds", emoji: "🐔", tiles: ["Chicken", "Goose", "Turkey", "Rooster"] },
  { theme: "Bugs", emoji: "🐞", tiles: ["Ant", "Bee", "Ladybug", "Caterpillar"] },
  { theme: "Creepy Crawlies", emoji: "🕷️", tiles: ["Spider", "Worm", "Beetle", "Centipede"] },
  { theme: "Pond Animals", emoji: "🐸", tiles: ["Frog", "Turtle", "Newt", "Tadpole"] },
  { theme: "Big Animals", emoji: "🐘", tiles: ["Elephant", "Giraffe", "Hippo", "Moose"] },
  { theme: "Small Animals", emoji: "🐭", tiles: ["Mouse", "Rabbit", "Squirrel", "Chipmunk"] },
  { theme: "Reptiles", emoji: "🦎", tiles: ["Snake", "Lizard", "Crocodile", "Iguana"] },
  { theme: "Zoo Animals", emoji: "🦓", tiles: ["Zebra", "Panda", "Kangaroo", "Lemur"] },
  { theme: "Baby Animals", emoji: "🐤", tiles: ["Puppy", "Kitten", "Chick", "Duckling"] },
  { theme: "Farm Babies", emoji: "🐑", tiles: ["Calf", "Lamb", "Foal", "Piglet"] },
  { theme: "Dinosaurs", emoji: "🦕", tiles: ["T-Rex", "Raptor", "Stego", "Bronto"] },
  { theme: "Arctic Animals", emoji: "🐧", tiles: ["Penguin", "Seal", "Walrus", "Reindeer"] },
  { theme: "Woodland Animals", emoji: "🦊", tiles: ["Fox", "Deer", "Badger", "Hedgehog"] },
  { theme: "Kinds of Bears", emoji: "🐻", tiles: ["Grizzly", "Polar", "Panda", "Koala"] },
  { theme: "Fast Animals", emoji: "🐆", tiles: ["Cheetah", "Horse", "Hare", "Gazelle"] },
  { theme: "Slow Animals", emoji: "🐌", tiles: ["Snail", "Sloth", "Tortoise", "Slug"] },
  { theme: "Pond Birds", emoji: "🦆", tiles: ["Duck", "Swan", "Heron", "Goose"] },
  { theme: "Animals with Horns", emoji: "🦏", tiles: ["Goat", "Rhino", "Bull", "Ram"] },
  { theme: "Jumping Animals", emoji: "🦘", tiles: ["Frog", "Rabbit", "Grasshopper", "Kangaroo"] },
  { theme: "Furry Pets", emoji: "🐹", tiles: ["Guinea Pig", "Gerbil", "Ferret", "Bunny"] },
  { theme: "Animals with Shells", emoji: "🐚", tiles: ["Snail", "Turtle", "Clam", "Crab"] },
  { theme: "Striped Animals", emoji: "🐅", tiles: ["Tiger", "Zebra", "Bee", "Skunk"] },
  { theme: "Spotted Animals", emoji: "🐆", tiles: ["Leopard", "Dalmatian", "Ladybug", "Giraffe"] },
  { theme: "Animals That Hop", emoji: "🐰", tiles: ["Bunny", "Kangaroo", "Frog", "Cricket"] },
  { theme: "Animals That Swim", emoji: "🐟", tiles: ["Fish", "Duck", "Otter", "Seal"] },
  { theme: "Night Animals", emoji: "🦇", tiles: ["Owl", "Bat", "Raccoon", "Moth"] },
  { theme: "Desert Animals", emoji: "🐫", tiles: ["Camel", "Lizard", "Scorpion", "Meerkat"] },
  { theme: "Rainforest Animals", emoji: "🦜", tiles: ["Parrot", "Toucan", "Jaguar", "Monkey"] },

  // ---- Fruits & Veggies ----
  { theme: "Fruits", emoji: "🍎", tiles: ["Apple", "Banana", "Grape", "Cherry"] },
  { theme: "More Fruits", emoji: "🍑", tiles: ["Peach", "Pear", "Plum", "Apricot"] },
  { theme: "Berries", emoji: "🍓", tiles: ["Strawberry", "Blueberry", "Raspberry", "Blackberry"] },
  { theme: "Tropical Fruits", emoji: "🥭", tiles: ["Mango", "Pineapple", "Coconut", "Papaya"] },
  { theme: "Melons", emoji: "🍉", tiles: ["Watermelon", "Cantaloupe", "Honeydew", "Muskmelon"] },
  { theme: "Citrus Fruits", emoji: "🍋", tiles: ["Lemon", "Lime", "Grapefruit", "Tangerine"] },
  { theme: "Vegetables", emoji: "🥕", tiles: ["Carrot", "Potato", "Onion", "Cabbage"] },
  { theme: "Green Veggies", emoji: "🥦", tiles: ["Broccoli", "Peas", "Spinach", "Kale"] },
  { theme: "Salad Veggies", emoji: "🥗", tiles: ["Lettuce", "Cucumber", "Tomato", "Radish"] },
  { theme: "Root Veggies", emoji: "🥔", tiles: ["Beet", "Radish", "Turnip", "Carrot"] },
  { theme: "Squash", emoji: "🎃", tiles: ["Pumpkin", "Zucchini", "Gourd", "Butternut"] },
  { theme: "Crunchy Veggies", emoji: "🌽", tiles: ["Corn", "Celery", "Pepper", "Cucumber"] },

  // ---- Food & Drink ----
  { theme: "Breakfast Foods", emoji: "🍳", tiles: ["Eggs", "Toast", "Cereal", "Pancakes"] },
  { theme: "Sweet Treats", emoji: "🍪", tiles: ["Cake", "Cookie", "Candy", "Pie"] },
  { theme: "Cold Treats", emoji: "🍦", tiles: ["Ice Cream", "Popsicle", "Sherbet", "Gelato"] },
  { theme: "Drinks", emoji: "🥛", tiles: ["Milk", "Juice", "Water", "Lemonade"] },
  { theme: "Fast Food", emoji: "🍔", tiles: ["Burger", "Fries", "Hot Dog", "Nuggets"] },
  { theme: "Snacks", emoji: "🍿", tiles: ["Chips", "Pretzel", "Popcorn", "Crackers"] },
  { theme: "Dinner Foods", emoji: "🍝", tiles: ["Pasta", "Rice", "Soup", "Stew"] },
  { theme: "Pizza Toppings", emoji: "🍕", tiles: ["Cheese", "Pepperoni", "Mushroom", "Sausage"] },
  { theme: "Baked Goods", emoji: "🥐", tiles: ["Bread", "Muffin", "Bagel", "Croissant"] },
  { theme: "Sandwich Fillings", emoji: "🥪", tiles: ["Ham", "Turkey", "Jam", "Peanut Butter"] },
  { theme: "Party Foods", emoji: "🎂", tiles: ["Cupcake", "Punch", "Chips", "Pretzels"] },
  { theme: "Warm Drinks", emoji: "☕", tiles: ["Cocoa", "Tea", "Cider", "Coffee"] },
  { theme: "Candy", emoji: "🍬", tiles: ["Lollipop", "Gumdrop", "Chocolate", "Jellybean"] },
  { theme: "Dairy", emoji: "🧀", tiles: ["Cheese", "Yogurt", "Butter", "Cream"] },
  { theme: "Things on a Sandwich", emoji: "🥬", tiles: ["Lettuce", "Cheese", "Ham", "Tomato"] },
  { theme: "Soup Ingredients", emoji: "🍲", tiles: ["Noodles", "Broth", "Veggies", "Beans"] },
  { theme: "Taco Fillings", emoji: "🌮", tiles: ["Beans", "Cheese", "Salsa", "Lettuce"] },
  { theme: "Ice Cream Flavors", emoji: "🍨", tiles: ["Vanilla", "Chocolate", "Strawberry", "Mint"] },
  { theme: "Things You Bake", emoji: "🧁", tiles: ["Cookies", "Brownies", "Muffins", "Bread"] },
  { theme: "Picnic Foods", emoji: "🧺", tiles: ["Sandwiches", "Watermelon", "Lemonade", "Chips"] },

  // ---- Colors ----
  { theme: "Colors", emoji: "🔴", tiles: ["Red", "Blue", "Green", "Yellow"] },
  { theme: "Bright Colors", emoji: "🟡", tiles: ["Purple", "Pink", "Orange", "Lime"] },
  { theme: "Dark Colors", emoji: "⚫", tiles: ["Black", "Brown", "Gray", "Navy"] },
  { theme: "Rainbow Colors", emoji: "🌈", tiles: ["Indigo", "Violet", "Teal", "Magenta"] },
  { theme: "Warm Colors", emoji: "🟠", tiles: ["Crimson", "Amber", "Gold", "Coral"] },
  { theme: "Cool Colors", emoji: "🔵", tiles: ["Aqua", "Mint", "Sky", "Turquoise"] },

  // ---- Shapes ----
  { theme: "Shapes", emoji: "🔺", tiles: ["Circle", "Square", "Triangle", "Rectangle"] },
  { theme: "Fun Shapes", emoji: "⭐", tiles: ["Star", "Heart", "Diamond", "Crescent"] },
  { theme: "More Shapes", emoji: "🔷", tiles: ["Oval", "Cone", "Hexagon", "Pentagon"] },

  // ---- Numbers ----
  { theme: "Small Numbers", emoji: "1️⃣", tiles: ["One", "Two", "Three", "Four"] },
  { theme: "Middle Numbers", emoji: "5️⃣", tiles: ["Five", "Six", "Seven", "Eight"] },
  { theme: "Bigger Numbers", emoji: "9️⃣", tiles: ["Nine", "Ten", "Eleven", "Twelve"] },
  { theme: "Counting by Tens", emoji: "🔟", tiles: ["Ten", "Twenty", "Thirty", "Forty"] },

  // ---- Body ----
  { theme: "On Your Face", emoji: "👃", tiles: ["Eyes", "Nose", "Mouth", "Cheeks"] },
  { theme: "Body Parts", emoji: "💪", tiles: ["Arm", "Leg", "Back", "Tummy"] },
  { theme: "On Your Hand", emoji: "✋", tiles: ["Finger", "Thumb", "Palm", "Knuckle"] },
  { theme: "On Your Foot", emoji: "🦶", tiles: ["Toe", "Heel", "Ankle", "Arch"] },
  { theme: "On Your Head", emoji: "👂", tiles: ["Hair", "Ear", "Chin", "Forehead"] },

  // ---- Nature & Weather ----
  { theme: "Weather", emoji: "🌧️", tiles: ["Rain", "Snow", "Wind", "Fog"] },
  { theme: "In the Sky", emoji: "☁️", tiles: ["Cloud", "Sun", "Rainbow", "Airplane"] },
  { theme: "At Night", emoji: "🌙", tiles: ["Moon", "Star", "Comet", "Firefly"] },
  { theme: "Seasons", emoji: "🍂", tiles: ["Spring", "Summer", "Winter", "Fall"] },
  { theme: "In the Garden", emoji: "🌷", tiles: ["Flower", "Bush", "Vine", "Weed"] },
  { theme: "Flowers", emoji: "🌸", tiles: ["Rose", "Tulip", "Daisy", "Sunflower"] },
  { theme: "Trees", emoji: "🌳", tiles: ["Oak", "Pine", "Maple", "Birch"] },
  { theme: "Rocks & Ground", emoji: "🪨", tiles: ["Sand", "Mud", "Pebble", "Dirt"] },
  { theme: "Water Places", emoji: "🌊", tiles: ["Lake", "River", "Ocean", "Pond"] },
  { theme: "Big Landforms", emoji: "⛰️", tiles: ["Mountain", "Hill", "Valley", "Cliff"] },
  { theme: "Stormy Weather", emoji: "⛈️", tiles: ["Thunder", "Lightning", "Hail", "Gust"] },
  { theme: "Cold Things", emoji: "❄️", tiles: ["Ice", "Frost", "Icicle", "Snowflake"] },

  // ---- Vehicles ----
  { theme: "Vehicles", emoji: "🚗", tiles: ["Car", "Truck", "Bus", "Van"] },
  { theme: "Things That Fly", emoji: "✈️", tiles: ["Plane", "Helicopter", "Rocket", "Jet"] },
  { theme: "Water Vehicles", emoji: "⛵", tiles: ["Boat", "Ship", "Canoe", "Kayak"] },
  { theme: "Trains", emoji: "🚆", tiles: ["Train", "Tram", "Subway", "Monorail"] },
  { theme: "Two-Wheelers", emoji: "🚲", tiles: ["Bike", "Scooter", "Motorcycle", "Moped"] },
  { theme: "Emergency Vehicles", emoji: "🚑", tiles: ["Ambulance", "Fire Truck", "Police Car", "Tow Truck"] },
  { theme: "Big Machines", emoji: "🚜", tiles: ["Tractor", "Digger", "Crane", "Forklift"] },
  { theme: "Construction Trucks", emoji: "🚧", tiles: ["Bulldozer", "Dump Truck", "Cement Mixer", "Excavator"] },

  // ---- School ----
  { theme: "School Supplies", emoji: "✏️", tiles: ["Pencil", "Eraser", "Crayon", "Ruler"] },
  { theme: "In the Classroom", emoji: "🏫", tiles: ["Desk", "Board", "Chair", "Clock"] },
  { theme: "Reading Things", emoji: "📚", tiles: ["Book", "Page", "Story", "Word"] },
  { theme: "Art Supplies", emoji: "🎨", tiles: ["Paint", "Brush", "Glue", "Scissors"] },
  { theme: "Writing Tools", emoji: "🖊️", tiles: ["Pen", "Marker", "Chalk", "Highlighter"] },
  { theme: "School Subjects", emoji: "🧮", tiles: ["Math", "Science", "Reading", "Art"] },

  // ---- Home ----
  { theme: "Rooms in a House", emoji: "🏠", tiles: ["Kitchen", "Bedroom", "Bathroom", "Living Room"] },
  { theme: "Furniture", emoji: "🛋️", tiles: ["Chair", "Table", "Sofa", "Dresser"] },
  { theme: "In the Kitchen", emoji: "🍽️", tiles: ["Plate", "Cup", "Bowl", "Mug"] },
  { theme: "Silverware", emoji: "🍴", tiles: ["Fork", "Knife", "Spoon", "Ladle"] },
  { theme: "In the Bathroom", emoji: "🛁", tiles: ["Soap", "Towel", "Toothbrush", "Shampoo"] },
  { theme: "In the Bedroom", emoji: "🛏️", tiles: ["Bed", "Pillow", "Blanket", "Nightstand"] },
  { theme: "Cleaning Tools", emoji: "🧹", tiles: ["Broom", "Mop", "Sponge", "Bucket"] },
  { theme: "Things with Doors", emoji: "🚪", tiles: ["Fridge", "Oven", "Closet", "Cabinet"] },
  { theme: "Lights", emoji: "💡", tiles: ["Lamp", "Candle", "Flashlight", "Lantern"] },
  { theme: "Kitchen Appliances", emoji: "🍞", tiles: ["Toaster", "Blender", "Microwave", "Kettle"] },

  // ---- Clothes ----
  { theme: "Clothes", emoji: "👕", tiles: ["Shirt", "Pants", "Dress", "Skirt"] },
  { theme: "Warm Clothes", emoji: "🧣", tiles: ["Coat", "Scarf", "Mittens", "Sweater"] },
  { theme: "On Your Feet", emoji: "👟", tiles: ["Shoes", "Socks", "Boots", "Sandals"] },
  { theme: "Hats", emoji: "🧢", tiles: ["Hat", "Cap", "Helmet", "Beanie"] },
  { theme: "Rainy Day Gear", emoji: "☔", tiles: ["Umbrella", "Raincoat", "Galoshes", "Poncho"] },
  { theme: "Pajamas & Sleep", emoji: "🥱", tiles: ["Pajamas", "Robe", "Slippers", "Nightgown"] },

  // ---- Toys & Play ----
  { theme: "Toys", emoji: "🧸", tiles: ["Ball", "Doll", "Blocks", "Teddy"] },
  { theme: "Outdoor Play", emoji: "🪁", tiles: ["Kite", "Jump Rope", "Frisbee", "Hula Hoop"] },
  { theme: "Board Games", emoji: "🎲", tiles: ["Checkers", "Cards", "Dice", "Dominoes"] },
  { theme: "Playground", emoji: "🛝", tiles: ["Slide", "Swing", "Seesaw", "Sandbox"] },
  { theme: "Building Toys", emoji: "🧱", tiles: ["Legos", "Bricks", "Magnets", "Gears"] },
  { theme: "Water Play", emoji: "🫧", tiles: ["Bubbles", "Squirt Gun", "Splash", "Water Balloon"] },

  // ---- Music ----
  { theme: "Instruments", emoji: "🥁", tiles: ["Drum", "Guitar", "Piano", "Flute"] },
  { theme: "More Instruments", emoji: "🎺", tiles: ["Violin", "Trumpet", "Cello", "Harp"] },
  { theme: "Music Words", emoji: "🎵", tiles: ["Song", "Beat", "Tune", "Melody"] },
  { theme: "Loud Instruments", emoji: "🎷", tiles: ["Cymbals", "Tuba", "Trombone", "Horn"] },

  // ---- Sports ----
  { theme: "Ball Sports", emoji: "⚽", tiles: ["Soccer", "Basketball", "Baseball", "Football"] },
  { theme: "Sports Gear", emoji: "🧤", tiles: ["Bat", "Glove", "Net", "Racket"] },
  { theme: "Water Sports", emoji: "🏊", tiles: ["Swimming", "Diving", "Surfing", "Snorkeling"] },
  { theme: "Winter Sports", emoji: "⛷️", tiles: ["Skiing", "Skating", "Sledding", "Snowboarding"] },

  // ---- People ----
  { theme: "Family", emoji: "👨‍👩‍👧", tiles: ["Mom", "Dad", "Baby", "Sister"] },
  { theme: "More Family", emoji: "👵", tiles: ["Brother", "Grandma", "Grandpa", "Auntie"] },
  { theme: "Community Helpers", emoji: "🚒", tiles: ["Doctor", "Teacher", "Firefighter", "Police Officer"] },
  { theme: "More Jobs", emoji: "👨‍🍳", tiles: ["Chef", "Pilot", "Farmer", "Builder"] },
  { theme: "Health Helpers", emoji: "🩺", tiles: ["Nurse", "Dentist", "Vet", "Surgeon"] },
  { theme: "Fairy Tale People", emoji: "👑", tiles: ["King", "Queen", "Prince", "Princess"] },

  // ---- Fantasy ----
  { theme: "Magic People", emoji: "🧙", tiles: ["Wizard", "Witch", "Fairy", "Sorcerer"] },
  { theme: "Storybook Creatures", emoji: "🐉", tiles: ["Dragon", "Unicorn", "Mermaid", "Troll"] },
  { theme: "Spooky Things", emoji: "👻", tiles: ["Ghost", "Monster", "Goblin", "Zombie"] },
  { theme: "Superhero Words", emoji: "🦸", tiles: ["Cape", "Mask", "Hero", "Power"] },

  // ---- Space ----
  { theme: "In Space", emoji: "🚀", tiles: ["Rocket", "Astronaut", "Alien", "Satellite"] },
  { theme: "Planets", emoji: "🪐", tiles: ["Earth", "Mars", "Saturn", "Jupiter"] },
  { theme: "Space Sights", emoji: "☄️", tiles: ["Comet", "Galaxy", "Meteor", "Nebula"] },

  // ---- Around Town ----
  { theme: "Places to Go", emoji: "🏞️", tiles: ["Park", "Zoo", "Beach", "Museum"] },
  { theme: "Buildings", emoji: "🏢", tiles: ["Store", "Library", "Hospital", "Bank"] },
  { theme: "On the Road", emoji: "🚦", tiles: ["Stop Sign", "Crosswalk", "Traffic Light", "Speed Bump"] },
  { theme: "At the Farm", emoji: "🚜", tiles: ["Barn", "Silo", "Field", "Fence"] },
  { theme: "At the Beach", emoji: "🏖️", tiles: ["Shell", "Sandcastle", "Wave", "Seagull"] },
  { theme: "At the Circus", emoji: "🎪", tiles: ["Clown", "Tent", "Acrobat", "Juggler"] },
  { theme: "At the Doctor", emoji: "🏥", tiles: ["Waiting Room", "Checkup", "Shot", "Bandage"] },
  { theme: "At the Grocery Store", emoji: "🛒", tiles: ["Cart", "Aisle", "Checkout", "Basket"] },
  { theme: "Things in the Ocean", emoji: "🐠", tiles: ["Coral", "Seaweed", "Starfish", "Shell"] },
  { theme: "Things in a Nest", emoji: "🪺", tiles: ["Egg", "Twig", "Chick", "Feather"] },

  // ---- Bath & Bedtime ----
  { theme: "Bath Time", emoji: "🛀", tiles: ["Bubbles", "Rubber Duck", "Washcloth", "Soap"] },
  { theme: "Bedtime", emoji: "😴", tiles: ["Teddy", "Nightlight", "Lullaby", "Story"] },

  // ---- Actions ----
  { theme: "Ways to Move", emoji: "🏃", tiles: ["Run", "Jump", "Hop", "Skip"] },
  { theme: "Quiet Actions", emoji: "🤫", tiles: ["Sleep", "Read", "Whisper", "Rest"] },
  { theme: "Loud Actions", emoji: "📣", tiles: ["Shout", "Clap", "Stomp", "Cheer"] },
  { theme: "Kitchen Actions", emoji: "🥄", tiles: ["Stir", "Bake", "Chop", "Mix"] },
  { theme: "Water Actions", emoji: "💦", tiles: ["Splash", "Swim", "Float", "Dive"] },
  { theme: "Face Actions", emoji: "😄", tiles: ["Smile", "Wink", "Yawn", "Frown"] },

  // ---- Descriptions ----
  { theme: "Big Words", emoji: "🐘", tiles: ["Huge", "Giant", "Large", "Enormous"] },
  { theme: "Small Words", emoji: "🐜", tiles: ["Tiny", "Little", "Small", "Mini"] },
  { theme: "Happy Words", emoji: "😊", tiles: ["Glad", "Cheerful", "Joyful", "Merry"] },
  { theme: "Fast & Slow", emoji: "🐢", tiles: ["Quick", "Speedy", "Slow", "Zippy"] },
  { theme: "Temperature Words", emoji: "🌡️", tiles: ["Hot", "Cold", "Warm", "Cool"] },
  { theme: "Feeling Words", emoji: "🥰", tiles: ["Happy", "Sad", "Sleepy", "Angry"] },

  // ---- Holidays & Fun ----
  { theme: "Birthday Party", emoji: "🎉", tiles: ["Balloons", "Presents", "Candles", "Confetti"] },
  { theme: "Halloween", emoji: "🎃", tiles: ["Pumpkin", "Costume", "Spider", "Bat"] },
  { theme: "Winter Holidays", emoji: "🎄", tiles: ["Snowman", "Sleigh", "Ornament", "Stocking"] },
  { theme: "Rainy Day Fun", emoji: "🌂", tiles: ["Puddle", "Splash", "Boots", "Umbrella"] },
  { theme: "Camping", emoji: "🏕️", tiles: ["Tent", "Campfire", "Marshmallow", "Sleeping Bag"] },

  // ---- Sounds ----
  { theme: "Animal Sounds", emoji: "🔊", tiles: ["Moo", "Oink", "Baa", "Neigh"] },
  { theme: "Loud Sounds", emoji: "💥", tiles: ["Bang", "Boom", "Crash", "Pop"] },
  { theme: "Soft Sounds", emoji: "🤫", tiles: ["Hush", "Purr", "Hum", "Sigh"] },

  // ---- Time ----
  { theme: "Days & Time", emoji: "📅", tiles: ["Today", "Tomorrow", "Yesterday", "Weekend"] },
  { theme: "Times of Day", emoji: "🌅", tiles: ["Morning", "Noon", "Night", "Evening"] },
  { theme: "Months", emoji: "🗓️", tiles: ["May", "June", "July", "August"] },

  // ---- Misc concrete ----
  { theme: "Things in the Sky", emoji: "🎈", tiles: ["Balloon", "Kite", "Bird", "Plane"] },
  { theme: "Sticky Things", emoji: "🍯", tiles: ["Honey", "Glue", "Syrup", "Tape"] },
  { theme: "Round Things", emoji: "⚽", tiles: ["Ball", "Orange", "Wheel", "Coin"] },
  { theme: "Things That Light Up", emoji: "🔦", tiles: ["Firefly", "Star", "Lantern", "Candle"] },
  { theme: "Things with Wings", emoji: "🦋", tiles: ["Butterfly", "Bat", "Bird", "Airplane"] },
  { theme: "Things That Bounce", emoji: "🏀", tiles: ["Rubber Ball", "Kangaroo", "Trampoline", "Pogo Stick"] },
  { theme: "Things You Wear", emoji: "🧦", tiles: ["Glasses", "Watch", "Ring", "Necklace"] },
  { theme: "Things That Spin", emoji: "🌀", tiles: ["Top", "Fan", "Windmill", "Wheel"] },
  { theme: "Soft Things", emoji: "☁️", tiles: ["Pillow", "Feather", "Cotton", "Marshmallow"] },
  { theme: "Hard Things", emoji: "🪨", tiles: ["Rock", "Brick", "Metal", "Stone"] },
  { theme: "Things That Grow", emoji: "🌱", tiles: ["Seed", "Sprout", "Plant", "Flower"] },
  { theme: "Things in a Toolbox", emoji: "🔨", tiles: ["Hammer", "Screwdriver", "Wrench", "Nail"] },
  { theme: "Things in a Backpack", emoji: "🎒", tiles: ["Lunchbox", "Notebook", "Water Bottle", "Pencil Case"] },
  { theme: "Things in the Garden", emoji: "🪴", tiles: ["Shovel", "Watering Can", "Rake", "Hose"] },

  // ---- Occupation gear ----
  { theme: "Doctor Things", emoji: "🩹", tiles: ["Bandage", "Thermometer", "Stethoscope", "Syringe"] },
  { theme: "Chef Things", emoji: "🍳", tiles: ["Apron", "Pot", "Whisk", "Spatula"] },
  { theme: "Pirate Things", emoji: "🏴‍☠️", tiles: ["Treasure", "Parrot", "Map", "Eyepatch"] },
  { theme: "Farm Tools", emoji: "🌾", tiles: ["Plow", "Hoe", "Wheelbarrow", "Pitchfork"] },

  // ---- Materials ----
  { theme: "Made of Wood", emoji: "🪵", tiles: ["Log", "Stick", "Plank", "Branch"] },
  { theme: "Made of Paper", emoji: "📄", tiles: ["Card", "Newspaper", "Napkin", "Envelope"] },
  { theme: "Made of Glass", emoji: "🪟", tiles: ["Window", "Mirror", "Jar", "Bottle"] },

  // ---- More water ----
  { theme: "On a Boat", emoji: "⚓", tiles: ["Sail", "Anchor", "Oar", "Rudder"] },
  { theme: "At the Pool", emoji: "🏊", tiles: ["Float", "Goggles", "Diving Board", "Ladder"] },

  // ---- Extra everyday ----
  { theme: "Things with Buttons", emoji: "🎮", tiles: ["Remote", "Shirt", "Elevator", "Calculator"] },
  { theme: "Things with Wheels", emoji: "🛞", tiles: ["Wagon", "Stroller", "Skateboard", "Roller Skates"] },
  { theme: "Things You Open", emoji: "🎁", tiles: ["Gift", "Jar", "Door", "Book"] },
  { theme: "Things You Ride", emoji: "🎠", tiles: ["Pony", "Bike", "Carousel", "Train"] },
  { theme: "Things That Ring", emoji: "🔔", tiles: ["Bell", "Phone", "Alarm", "Doorbell"] },
  { theme: "Things You Blow", emoji: "🎈", tiles: ["Whistle", "Bubbles", "Balloon", "Horn"] },
  { theme: "Things You Squeeze", emoji: "🧴", tiles: ["Sponge", "Lemon", "Ketchup", "Toothpaste"] },
  { theme: "Things You Fold", emoji: "🧺", tiles: ["Laundry", "Paper", "Map", "Towel"] },

  // ---- Feelings / faces ----
  { theme: "Silly Faces", emoji: "🤪", tiles: ["Silly", "Goofy", "Funny", "Wacky"] },
  { theme: "Scared Words", emoji: "😱", tiles: ["Scared", "Nervous", "Jumpy", "Afraid"] },
  { theme: "Sleepy Words", emoji: "😪", tiles: ["Tired", "Drowsy", "Yawny", "Snoozy"] },
];

// Make available to the game code (and to Node if ever needed for testing).
if (typeof module !== "undefined" && module.exports) {
  module.exports = { GROUPS };
}
