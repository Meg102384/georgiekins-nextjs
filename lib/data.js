import articlesData from './articles.json';

// Map pet key -> actual character image filename in /public/images
export const PET_IMAGE = {
  cat: 'georgie.png',
  dog: 'maple.png',
  gecko: 'sprout.png',
  guineapig: 'cleo.png',
  bird: 'felix.png',
  bunny: 'winnie.png',
};

export const PETS = articlesData.pets;
export const ARTICLES = articlesData.articles;

export function getPetArticles(pet) {
  return ARTICLES[pet] || [];
}

export function getArticle(pet, slug) {
  return getPetArticles(pet).find((a) => a.slug === slug);
}

export const CREW = [
  {
    key: 'georgie',
    name: 'Georgie',
    species: 'Cat',
    emoji: '🐱',
    title: 'The Host',
    img: 'georgie.png',
    gender: 'male',
    bio: 'Curious, cozy, and endlessly nosy — if there’s a box, he’s in it.',
    likes: ['cardboard boxes', 'sunbeams', 'treats'],
    note: 'professional napper',
  },
  {
    key: 'maple',
    name: 'Maple',
    species: 'Dog',
    emoji: '🐶',
    title: 'The Sunshine',
    img: 'maple.png',
    gender: 'female',
    bio: 'Sweet as syrup and twice as sticky with affection. Her tail hasn’t stopped wagging since day one.',
    likes: ['belly rubs', 'sunbeams', 'you'],
    note: 'professional cuddler',
    accent: 'yellow',
  },
  {
    key: 'sprout',
    name: 'Sprout',
    species: 'Gecko',
    emoji: '🦎',
    title: 'The Chill One',
    img: 'sprout.png',
    gender: 'male',
    bio: 'Big warm-rock energy in a tiny package. Moves slow, thinks deep.',
    likes: ['warm rocks', 'quiet corners', 'slow mornings'],
    note: 'finds every sunny spot',
    accent: 'mint',
  },
  {
    key: 'cleo',
    name: 'Cleo',
    species: 'Guinea Pig',
    emoji: '🐹',
    title: 'The Snack Queen',
    img: 'cleo.png',
    gender: 'female',
    bio: 'Squeaks the second the fridge opens. Rules the hay pile, accepts payment in veggies only.',
    likes: ['veggies', 'popcorning', 'snack time'],
    note: 'snack inspector',
    accent: 'peach',
  },
  {
    key: 'felix',
    name: 'Felix',
    species: 'Bird',
    emoji: '🐦',
    title: 'The Singer',
    img: 'felix.png',
    gender: 'male',
    bio: 'Whistles his own theme song every morning. Cheeky, chatty, convinced he’s the star.',
    likes: ['morning solos', 'mirrors', 'applause'],
    note: 'self-appointed lead vocalist',
    accent: 'teal',
  },
  {
    key: 'winnie',
    name: 'Winnie',
    species: 'Bunny',
    emoji: '🐰',
    title: 'The Gentle Heart',
    img: 'winnie.png',
    gender: 'female',
    bio: 'Softest member of the family, inside and out. First to snuggle when you’re having a hard day.',
    likes: ['cuddles', 'hopping', 'fresh greens'],
    note: 'champion binky-er',
  },
];
export const FACTS = {
  georgie: [
    "Cats have a special organ called the Jacobson's organ that helps them detect scents we can't even imagine! That's why they're such curious explorers.",
    "Cats spend up to 70% of their lives sleeping. Georgie calls it 'professional coziness training.'",
    "Every cat's nose has a unique pattern of tiny bumps and ridges — just like a human fingerprint. No two noses are exactly alike!",
    "House cats share about 95% of their DNA with tigers. Georgie prefers to think of himself as a very small, very spoiled big cat.",
    "Cats can't taste sweetness at all — they're missing the taste receptor gene for it. Georgie will never understand the appeal of birthday cake.",
    "A cat's whiskers are roughly as wide as its body, acting like built-in measuring tape for deciding if a gap is worth squeezing through.",
    "Meowing at people is a behavior cats mostly developed just for us — grown cats rarely meow at each other out in the world.",
    "A slow, sleepy blink is basically a cat's version of a smile. Try blinking slowly back at Georgie and see what he does!",
    "Each of a cat's ears is powered by about 32 tiny muscles, letting them rotate almost all the way around to pinpoint the faintest sound.",
    "Cats spend roughly half of their waking hours grooming themselves — it keeps them clean, cool, and wonderfully zen.",
    "Cats have a third eyelid called a nictitating membrane that sweeps across the eye to keep it protected and moist.",
    "A cat's purr vibrates at a frequency some researchers believe may help promote healing in bones and tissue — basically a built-in purr-scription.",
  ],
  maple: [
    "A dog's nose print is completely unique — just like a human fingerprint! No two snoots are the same.",
    "Dogs can learn hundreds of words and gestures — some clever pups know over 1,000!",
    "A dog's sense of smell can be up to 100,000 times stronger than ours, thanks to roughly 300 million scent receptors packed into that snoot.",
    "Dogs sniff with each nostril separately, which actually helps them figure out which direction a smell is coming from.",
    "Dogs process what they see about 25% faster than humans do, so quick movements — like a squirrel darting by — look clearer to them than to us.",
    "Maple can hear sounds up to 60,000 Hz, way past the 20,000 Hz limit of human ears, and she can swivel each ear independently to zero in on noise.",
    "Some dogs can be trained to detect diseases like cancer and diabetes, and even sense an oncoming seizure, purely through scent.",
    "Dogs have a second 'nose' called the vomeronasal organ, tucked in the roof of the mouth, that picks up pheromone messages from other dogs.",
    "Puppies are born completely deaf and blind, relying only on smell and touch for their first couple of weeks of life.",
    "A dog's normal body temperature runs warmer than ours — usually around 101 to 102.5°F — which is perfectly healthy for them.",
    "Curling into a tight ball to sleep is an old instinct from wild canine ancestors, helping conserve body heat and protect vital organs.",
    "Studies show dogs wag more to the right when they're feeling good, like greeting their favorite person, and more to the left when they're anxious.",
  ],
  sprout: [
    "Most geckos can't blink — but leopard geckos like me are extra special. We have real eyelids and can even wink!",
    "Leopard geckos store extra energy in our chubby tails — mine is basically a built-in snack pantry!",
    "If I ever feel seriously threatened, I can drop my tail and grow a brand new one over time — a trick called autotomy.",
    "Unlike a lot of gecko cousins, leopard geckos don't have sticky toe pads for climbing walls — we're proud ground-dwellers.",
    "My spots aren't just for style — they're real camouflage that helps me blend into rocky, sandy ground back home.",
    "I 'taste' the air by flicking my tongue, which helps me get familiar with new smells and surroundings.",
    "I'm most active at dawn, dusk, and through the night, and I spend sunny days tucked away somewhere cool and shady.",
    "Baby leopard geckos hatch with bold stripes instead of spots — the spotted pattern shows up as we grow into adults.",
    "Leopard geckos were one of the very first gecko species ever kept and bred as pets, going all the way back to the 1980s.",
    "Digging is totally normal for me — I do it to cool off, hide away, or hunt down a snack.",
    "Male leopard geckos have special pores near our hind legs that release pheromones — basically a built-in scent calling card.",
    "With good care, leopard geckos like me can live 15 to 20 years, sometimes even longer. I'm in this for the long haul!",
  ],
  cleo: [
    "Guinea pigs 'popcorn' when we're happy — hopping straight up like fluffy little kernels! I do it every time the veggie drawer opens.",
    "Guinea pigs can't make our own vitamin C, just like humans! That's why crunchy bell peppers are my superfood.",
    "I can hear sounds up to 46,000 Hz — way beyond what human ears can pick up, which tops out around 20,000 Hz.",
    "My eyes sit on the sides of my head, giving me an almost 340-degree view — perfect for keeping watch while I snack.",
    "My teeth never stop growing, so all that hay-munching isn't just for fun — it keeps them worn down to a healthy length.",
    "Sometimes I sleep with my eyes wide open — an old instinct leftover from being a prey animal that needs to stay alert.",
    "Despite the name, guinea pigs aren't pigs at all — we're rodents, distantly related to chinchillas and capybaras.",
    "I can make dozens of different sounds — wheeks, purrs, chutters, and rumbles — and each one means something different.",
    "Guinea pig pups are born fully furred with our eyes wide open, ready to nibble solid food within just a few days.",
    "We're very social by nature — in the wild, guinea pigs live in groups and bond closely with our herd.",
    "If I get startled, I might freeze completely still for a few seconds before deciding whether to bolt — it's an old trick to avoid catching a predator's eye.",
    "Guinea pigs originally come from the Andes Mountains in South America, where we've lived alongside humans for thousands of years.",
  ],
  felix: [
    "Cockatiels blush! When we're excited or warm, our cheek patches can look extra rosy.",
    "Some parrots name their chicks — each baby gets its own special call from mom and dad!",
    "My crest feathers are like a built-in mood ring — straight up can mean curious or alarmed, and flattened down usually means relaxed.",
    "Cockatiels are actually the smallest members of the cockatoo family, not a totally separate kind of bird.",
    "In the wild, cockatiels travel in big, noisy flocks across the Australian outback, always looking out for each other.",
    "Male cockatiels tend to be the bigger chatterboxes and whistlers, while females are usually quieter and stick closer to their favorite person.",
    "With good care, cockatiels can live 20 years or more — the oldest cockatiel on record lived to nearly 30!",
    "I've got excellent night vision thanks to extra-large pupils, handy for keeping watch even when the lights are low.",
    "My feather colors come from two different pigments working together — melanin for the grays, and psittacofulvins for warm yellows and oranges.",
    "Cockatiels can mimic all sorts of sounds we hear often — not just words, but microwave beeps and ringtones too!",
    "When I'm excited, I'll bob my head or 'flap dance' — it's basically my version of happy zoomies.",
    "I talk with my whole body — crest, eyes, and posture all together — so watch closely and you'll learn to read my moods.",
  ],
  winnie: [
    "When bunnies are super happy, we leap and twist in the air. It's called a 'binky' — and yes, it's as cute as it sounds!",
    "A bunny's teeth never stop growing, which is why we love to nibble all day long.",
    "Rabbits physically can't throw up — ever — which is exactly why a good hay-heavy diet matters so much for keeping our tummies happy.",
    "My eyes are positioned to give me nearly 360-degree vision, so I can watch almost every direction at once without turning my head.",
    "I'm liveliest at dawn and dusk — a habit passed down from wild ancestors who used those quiet hours to avoid predators.",
    "If something startles me, I might thump a back foot hard on the ground — it's my way of warning any bunnies nearby.",
    "Rabbits produce two kinds of droppings, and we actually eat one special soft kind to reabsorb nutrients we missed the first time through.",
    "Bunnies aren't rodents at all — we belong to our own group called lagomorphs, along with hares and pikas.",
    "When I'm truly relaxed and happy, I'll flop dramatically onto my side. It looks alarming, but it's actually one of the most content poses a bunny can strike.",
    "Rabbits are wonderfully social and can recognize their favorite humans, hopping over for pets and even learning their own name.",
    "My ears aren't just for hearing — they also help release extra body heat and keep me cool.",
    "Wild rabbit ancestors can sprint over 20 miles per hour in short bursts, so even a chill house bunny has surprising speed hiding in those hind legs.",
  ],
};

export const PET_PRODUCTS = [
  { key: 'cat', species: 'Cat', host: 'Georgie', img: 'georgie.png', kitPrice: 12, gender: 'male', emoji: '🐱' },
  { key: 'dog', species: 'Dog', host: 'Maple', img: 'maple.png', kitPrice: 12, gender: 'female', emoji: '🐶' },
  { key: 'gecko', species: 'Gecko', host: 'Sprout', img: 'sprout.png', kitPrice: 12, gender: 'male', emoji: '🦎' },
  { key: 'guineapig', species: 'Guinea Pig', host: 'Cleo', img: 'cleo.png', kitPrice: 12, gender: 'female', emoji: '🐹' },
  { key: 'bird', species: 'Bird', host: 'Felix', img: 'felix.png', kitPrice: 12, gender: 'male', emoji: '🐦' },
  { key: 'bunny', species: 'Bunny', host: 'Winnie', img: 'winnie.png', kitPrice: 12, gender: 'female', emoji: '🐰' },
];

export const PRODUCT_TYPES = [
  { key: 'journal', label: 'Pet Journal', price: 5, desc: 'Routine tracking, memories & milestones' },
  { key: 'sitter', label: 'Sitter Guide', price: 5, desc: 'Clear instructions for your pet sitter' },
  { key: 'new_pet_parent', label: 'New Pet Parent Guide', price: 5, desc: 'Help getting started with a new pet' },
  { key: 'kit', label: 'Full Care Kit', desc: 'All three printables together' },
];

export const BUNDLE_TIERS = { 2: 22, 3: 30, 4: 38, 5: 44, 6: 49 };
