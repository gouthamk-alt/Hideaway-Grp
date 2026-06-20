import { CMSContent } from './types.ts';

export const defaultCMSContent: CMSContent = {
  company: {
    name: "Hideaway Group",
    tagline: "CURATED SECLUSION",
    heroTitle: "Find your quiet. Secluded boutique escapes in the raw Australian wild.",
    heroSubtitle: "A premium collection of architectural eco-cabins, luxury glamping retreats, and retro-boutique coastal stays nestled in Australia's most spectacular landscapes.",
    aboutText: "Founded on the desire to reconnect with stillness, Hideaway Group curates luxury sanctuaries that are deeply rooted in their environments. Rejecting the sterile in favor of the sensory, each of our properties offers architecturally conscious design, sustainable off-grid footprints, and uncompromised comfort. From the monsoon forests of Litchfield to the coastal swells of Busselton, we invite you to disappear.",
    contactEmail: "escapes@hideawaygroup.com.au",
    contactPhone: "+61 8 9752 1544",
    contactAddress: "14 Albert Street, Busselton WA 6280, Australia",
    instagramHandle: "@hideaway.group",
    facebookLink: "https://facebook.com/hideawaygroup"
  },
  properties: [
    {
      id: "esc-litchfield",
      title: "Hideaway Litchfield",
      location: "Litchfield National Park, Northern Territory",
      description: "Nestled in the tropical monsoon bushland bordering Litchfield National Park, this architectural container cabin floats effortlessly above the natural stream system. Built from repurposed shipping containers and encased in deep black steel and floor-to-ceiling glass, it combines raw corrugated textures with refined organic materials. Fall asleep to the hum of the forest and wake up to native eucalyptus aromas.",
      price: 390,
      featuredImage: "https://images.unsplash.com/photo-1508333706533-1ec43ecb1606?auto=format&fit=crop&q=80&w=1200",
      images: [
        "https://images.unsplash.com/photo-1508333706533-1ec43ecb1606?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&q=80&w=1200"
      ],
      tags: ["Off-Grid", "Architectural", "Monsoon Bushland"],
      status: "published",
      amenities: ["Outdoor Soaking Tub", "King Bed", "Rain Shower", "Air Conditioning", "Private Deck", "Fireplace", "Weber BBQ"],
      capacity: "2 Guests",
      bedType: "Super King Bed",
      size: "48 sqm"
    },
    {
      id: "esc-busselton",
      title: "The Hideaway Busselton",
      location: "Busselton Beach, Western Australia",
      description: "A meticulously restored coastal boutique retreat channeling a refined mid-century beach aesthetic. Situated just steps from the pristine white sands of Geographe Bay, the motel features sun-drenched private patios, curved lime-washed brickwork, and hand-woven rattan furnishings. Perfect as a base to explore the world-renowned Margaret River wine region before retreating to premium coastal luxury.",
      price: 280,
      featuredImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200",
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1200"
      ],
      tags: ["Coastal", "Mid-Century", "Margaret River Gateway"],
      status: "published",
      amenities: ["Heated Magnesium Pool", "Private Beach Access", "Coastal Cruiser Bikes", "Premium Linen", "Curated Minibar", "Nespresso Machine", "Balcony"],
      capacity: "2-4 Guests",
      bedType: "Custom King or Twins",
      size: "42 sqm"
    },
    {
      id: "esc-byron",
      title: "Hideaway Glen Tent",
      location: "Byron Bay Hinterland, New South Wales",
      description: "An opulent safari glamping experience, suspended under a dense canopy of ancient sub-tropical rainforest. Hideaway Glen feels worlds away, yet sits just 15 minutes from the Byron coast. Structured with timber rafters and heavy canvas, the tent opens wide onto an extensive wrap-around ironbark deck featuring a brass-pipe outdoor double rain shower and a sunken limestone wood-fired tub.",
      price: 360,
      featuredImage: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=1200",
      images: [
        "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1200"
      ],
      tags: ["Glamping", "Sub-tropical", "Outdoor Bathing"],
      status: "published",
      amenities: ["Limestone Tub", "Plush Daybeds", "Indoor Wood Heater", "French Flax Linen", "Local Organic Coffee", "Bose Audio System", "Private Canopy Views"],
      capacity: "2 Guests",
      bedType: "Ultra-Plush King Bed",
      size: "52 sqm"
    },
    {
      id: "esc-yarra",
      title: "Hideaway Valley Ridge",
      location: "Yarra Valley, Victoria",
      description: "A cantilevered premium eco-cabin made of raw Australian blackbutt timber and dark corrugated steel, resting high above the valleys of the Victoria mountain range. Fully solar-powered with triple-glazed windows and a central cast-iron stove, this off-grid hideaway offers unparalleled views of rolling fog, kangaroos grazing at twilight, and starlit southern nights.",
      price: 420,
      featuredImage: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=1200",
      images: [
        "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=1200"
      ],
      tags: ["Eco-Luxury", "Alpine Elevation", "Panoramic Views"],
      status: "published",
      amenities: ["Cantilevered Balcony", "Double-Glazed Views", "Cast Iron Wood Burner", "Off-Grid Solar", "Local Wine Cellar Stock", "Handmade Ceramics", "Record Player"],
      capacity: "2 Guests",
      bedType: "Luxury Australian Wool Bed",
      size: "45 sqm"
    }
  ],
  services: [
    {
      id: "ser-curated",
      title: "Bespoke Gastronomy",
      description: "Indulge in seasonal organic dining crates sourced from local micro-farmers, custom-curated and waiting in your cabin fridge upon arrival.",
      iconName: "Utensils"
    },
    {
      id: "ser-guided",
      title: "Deep Wilderness Journeys",
      description: "Private interpretive walking trails led by local conservationists to discover secret waterfalls, sacred sites, and ancient pathways.",
      iconName: "Compass"
    },
    {
      id: "ser-wellness",
      title: "In-Cabin Forest Therapy",
      description: "On-demand wellness and sound therapy sessions hosted on your private deck, aligned with native botanical aromas.",
      iconName: "Sun"
    }
  ],
  journal: [
    {
      id: "jou-design",
      title: "The Art of Architectural Solitude",
      excerpt: "Why minimal structural outlines and raw corrugated zinc materials deepen our relationship with the Australian wild.",
      content: "When designing for the remote Australian bush, standard luxury often falls flat. True opulence lies in creating an invisible architectural filter between the visitor and the landscape. By utilizing dark timber paneling and black-zinc facades, our Litchfield cabins absorb rather than reflect light, allowing them to nestle naturally within the shadow of surrounding paperbark forests...",
      date: "May 12, 2026",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&q=80&w=800",
      author: "Lara Sinclair (Principal Architect)"
    },
    {
      id: "jou-local",
      title: "A Wine Curious Guide to Margaret River",
      excerpt: "Deep diving into Western Australia's premium organic, biodynamic, and low-intervention micro-wineries.",
      content: "Just a short, salt-scented drive from The Hideaway Busselton lies one of the world's most unique soils: the Margaret River Wine Province. Fed by sweeping cold swells from the Indian Ocean, local winemakers are driving a massive shift toward natural biodynamic practices. In this issue, we review three family-owned boutique cellars that redefine the Chardonnay and Cabernet experience...",
      date: "April 28, 2026",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800",
      author: "Marcus Vance"
    }
  ]
};
