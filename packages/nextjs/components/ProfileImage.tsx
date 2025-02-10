import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ERC725, ERC725JSONSchema } from "@erc725/erc725.js";
import lsp3ProfileSchema from "@erc725/erc725.js/schemas/LSP3ProfileMetadata.json";
import { Profile, luksoNetworks } from "~~/contexts/UniversalProfileContext";
import { getAddressColor } from "~~/utils/scaffold-eth/getAddressColor";

type Props = {
  address: `0x${string}`;
};

export default function ProfileImage({ address }: Props) {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const network = luksoNetworks[0];

        // Instanciate the LSP3-based smart contract
        const erc725js = new ERC725(lsp3ProfileSchema as ERC725JSONSchema[], address, network.rpcUrl, {
          ipfsGateway: network.ipfsGateway,
        });

        const profileMetadata = await erc725js.fetchData("LSP3Profile");

        if (
          profileMetadata.value &&
          typeof profileMetadata.value === "object" &&
          "LSP3Profile" in profileMetadata.value
        ) {
          setProfile(profileMetadata.value.LSP3Profile);
        }
      } catch (error) {
        console.error("Cannot fetch Hero data", error);
      }
    })();
  }, [address]);

  return (
    <>
      {!profile?.profileImage || profile.profileImage.length === 0 ? (
        <div className="w-full h-full rounded-full" style={{ backgroundColor: getAddressColor(address) }}></div> // Show grey background if there is no image
      ) : (
        <Link href={`https://universaleverything.io/${address}`} target="_blank">
          <Image
            src={profile.profileImage[0].url.replace("ipfs://", "https://api.universalprofile.cloud/ipfs/")}
            alt="Hero Profile"
            className="rounded-full object-cover"
            fill
            sizes="(max-width: 768px) 100vw"
            priority={true}
          />
        </Link>
      )}
    </>
  );
}
