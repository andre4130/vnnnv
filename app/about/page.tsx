import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'About',
  description: 'About the designer and photographer.',
};

const description = (
  <>
    <p>Somewhere between the planned and the unexpected, Noe makes things.</p>
    <p>
      He moves across images, identities, objects, moving pictures and
      unexplored ideas, exploring the space around them. Sometimes pushing
      things somewhere unfamiliar, sometimes simply finding the right light,
      frame or shape, always leaving room for whatever’s next.
    </p>
    <p>
      Born in Galicia, where the weather rarely plays by the rules, he developed
      an early appreciation for dramatic skies, aggressive storms and the brief,
      perfectly timed gap in the clouds. Years of unnecessary sunset watching
      have turned into a fairly useful ability to know when the light is about
      to happen.
    </p>
    <p>
      Based in BCN and moving wherever the next idea takes him, he’s always
      looking for the next angle, the unexpected connection, the thing that
      wasn’t there before. VNNNV is the space where those things meet.
    </p>
    <p>
      Luckily, Noe gets to work mostly with friends: VANS, ETNIES, FLYBIKES,
      SBRALLY WORKS, MONSIEUR VELO, INDITEX and DESIGUAL... If you’re not one
      yet, feel free to give him a shout.
    </p>
  </>
);

export default function AboutPage() {
  return <PageShell title='About' description={description} />;
}
