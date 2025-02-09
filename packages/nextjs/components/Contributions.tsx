import React from "react";
import DonationCard from "./cards/DonationCard";

type Props = {};

const donations = [
  {
    title: "Gitcoin",
    description: "Labore voluptate tempor nostrud eiusmod Lorem tempor qui.",
  },
  {
    title: "StakingVerse",
    description: "Labore voluptate tempor nostrud eiusmod Lorem tempor qui.",
  },
  {
    title: "Keez",
    description: "Labore voluptate tempor nostrud eiusmod Lorem tempor qui.",
  },
  {
    title: "SpeedRunLukso",
    description: "Labore voluptate tempor nostrud eiusmod Lorem tempor qui.",
  },
  {
    title: "Kitso",
    description: "Labore voluptate tempor nostrud eiusmod Lorem tempor qui.",
  },
];

export default function Contributions({}: Props) {
  return (
    <section id="contributions" className="flex flex-col min-h-[50vh] max-w-[1200px] mx-auto py-12">
      <header>
        <h2 className="text-lg font-bold">Contributions</h2>
        <text className="text-sm">Ut enim voluptate culpa ipsum cupidatat nulla nisi quis ipsum duis est nulla.</text>
      </header>

      <div className="mt-8 flex gap-4">
        {donations.map(donation => (
          <DonationCard key={donation.title} title={donation.title} description={donation.description} hideFooter />
        ))}
      </div>
    </section>
  );
}
