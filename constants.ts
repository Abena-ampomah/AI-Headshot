
import { HeadshotStyle } from './types';

export const HEADSHOT_STYLES: HeadshotStyle[] = [
  {
    id: 'corporate-grey',
    name: 'Corporate Grey',
    prompt: 'Generate a professional corporate headshot. The person should be wearing a business suit, with a neutral expression, against a solid dark grey studio backdrop. The lighting should be soft and flattering.',
    thumbnail: 'https://picsum.photos/seed/corporate/200/200',
  },
  {
    id: 'tech-office',
    name: 'Modern Tech Office',
    prompt: 'Generate a professional headshot. The person should have a friendly and approachable smile. The background should be a modern, slightly blurred tech office with glass walls and natural light.',
    thumbnail: 'https://picsum.photos/seed/tech/200/200',
  },
  {
    id: 'outdoor-natural',
    name: 'Outdoor Natural',
    prompt: 'Generate a candid-style professional headshot. The person should be outdoors in a park or urban green space, with soft, natural morning light. The background should be tastefully blurred (bokeh effect).',
    thumbnail: 'https://picsum.photos/seed/outdoor/200/200',
  },
  {
    id: 'black-and-white',
    name: 'Classic B&W',
    prompt: 'Generate a dramatic and classic black and white headshot. The lighting should be high-contrast (chiaroscuro style) to create a powerful and timeless look, against a plain black background.',
    thumbnail: 'https://picsum.photos/seed/bw/200/200',
  },
  {
    id: 'creative-studio',
    name: 'Creative Studio',
    prompt: 'Generate a vibrant headshot for a creative professional. The background should be a solid, bold color like teal or mustard yellow. The person should have an expressive, confident look.',
    thumbnail: 'https://picsum.photos/seed/creative/200/200',
  },
  {
    id: 'retro-filter',
    name: 'Retro Filter',
    prompt: 'Add a retro, vintage film filter to the image. It should have slightly faded colors, a subtle grain, and warm tones, reminiscent of a 1970s photograph.',
    thumbnail: 'https://picsum.photos/seed/retro/200/200',
  }
];
