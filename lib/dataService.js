import { supabaseAdmin } from './supabaseAdmin';

export const DEFAULT_CERTIFICATES = [
  { id: 1, title: "Graphic Design Masterclass", org: "Udemy", img: "/graphic-design.webp", category: "Design" },
  { id: 2, title: "Motion Design with Figma", org: "Udemy", img: "/motion-design.webp", category: "Motion" },
  { id: 3, title: "After Effects Course", org: "EDUCBA", img: "/after-effects.webp", category: "Video" },
  { id: 4, title: "DaVinci Resolve 16: Color Correction", org: "Blackmagicdesign", img: "/davinci-resolve.webp", category: "Video" },
  { id: 5, title: "Adobe Premiere Pro CC Masterclass", org: "Udemy", img: "/premiere-pro.webp", category: "Video" },
  { id: 6, title: "Web Development Masterclass", org: "Udemy", img: "/web-development.webp", category: "Development" },
  { id: 7, title: "Google Adwords Crash Course 2021", org: "Udemy", img: "/google-adwords.webp", category: "Marketing" },
  { id: 8, title: "Design Principles, Typography & Color Theory", org: "Udemy", img: "/design-principles.webp", category: "Design" }
];

export const DEFAULT_GALLERY_IMAGES = [
  { id: 1, title: "Participating in college cricket tournament", alt: "Students posing together outdoors with cricket bats", img: "/cricket.webp", category: "Sports" },
  { id: 2, title: "Successfully conducted Yathartha", alt: "Yathartha event team posing on stage with medals and posters", img: "/yathartha.webp", category: "Events" },
  { id: 3, title: "Celebrating incredible results of Clamphook with the team", alt: "Group gathered around a dining table under Nepal-themed wall art", img: "/clamphook.webp", category: "Team" },
  { id: 4, title: "Attending boring lectures", alt: "Student sitting at a classroom desk during a lecture", img: "/lecture.webp", category: "Campus" },
  { id: 5, title: "Deep in focus and exploring concepts", alt: "Student wearing a headset in front of video-editing software", img: "/exploring.webp", category: "Work" },
  { id: 6, title: "Nagdhunga Surung Marga", alt: "Dipesh standing by a roadside with hills in the background", img: "/nagdhunga surung marga.webp", category: "Field Visit" }
];

export async function getCertificates() {
  try {
    const { data, error } = await supabaseAdmin
      .from('certificates')
      .select('*')
      .order('id', { ascending: true });

    if (error || !data || data.length === 0) {
      return DEFAULT_CERTIFICATES;
    }
    return data;
  } catch {
    return DEFAULT_CERTIFICATES;
  }
}

export async function getGalleryImages() {
  try {
    const { data, error } = await supabaseAdmin
      .from('gallery_images')
      .select('*')
      .order('id', { ascending: true });

    if (error || !data || data.length === 0) {
      return DEFAULT_GALLERY_IMAGES;
    }
    return data;
  } catch {
    return DEFAULT_GALLERY_IMAGES;
  }
}

