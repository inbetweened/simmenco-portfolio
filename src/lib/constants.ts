export const SITE = {
  name: 'Daniel Simmen',
  role: 'Mediamatiker EFZ in Ausbildung',
  email: 'daniel@simmen.co',
  location: 'Luzern, Schweiz',
  social: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  },
}

export const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

/** Controls how many grid cells a tile occupies */
export type TileSize =
  | 'small'   // 1 col × 1 row
  | 'wide'    // 2 col × 1 row
  | 'tall'    // 1 col × 2 rows
  | 'large'   // 2 col × 2 rows

export type MediaType = 'image' | 'video'

export interface RiveMedia {
  src: string
  artboard: string
  animation?: string
  stateMachine?: string
  hoverInput?: string
  background?: string
}

export interface Project {
  id: string
  title: string
  category: string
  year: string
  /** Short sentence shown in the hover overlay */
  tagline: string
  /** Longer description used on the project page */
  description: string
  /** Tile size in the bento grid */
  size: TileSize
  /** Placeholder background color until real media is added */
  accent: string
  /** Optional: path to an image in /public/images/ */
  image?: string
  /** How the image fills the tile — defaults to 'cover' */
  imageFit?: 'cover' | 'contain'
  /** Optional: path to a video in /public/videos/ */
  video?: string
  /** Full case study text — paragraphs separated by \n\n */
  content?: string
  /** Additional videos shown below the primary video on the project page */
  videos?: { src: string; poster?: string; label: string; aspectRatio?: string }[]
  /** YouTube video ID for embedding on the project page */
  youtubeId?: string
  /** Structured case study sections with optional title and bullet list */
  sections?: { title?: string; body?: string; bullets?: string[] }[]
  /** Tech/discipline tags shown on the project page */
  tags?: string[]
  /** Gallery images shown on the project page */
  gallery?: { src: string; label?: string; aspectRatio?: string }[]
  tileRive?: RiveMedia
  detailRive?: RiveMedia
  /** If true, tile has no project page — hover only, no navigation */
  noPage?: boolean
}

export interface WorkExperience {
  company: string
  role: string
  period: string
  location: string
  description: string
  skills: string[]
}

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Messe Luzern',
    role: 'Lehre als Mediamatiker EFZ',
    period: '2022 — Jetzt',
    location: 'Luzern, Schweiz',
    description: 'Arbeit an der Schnittstelle von Design, Kommunikation, IT und Medienproduktion Mitarbeit an visuellen Inhalten, digitaler Kommunikation und Markenauftritt sowie Unterstützung im operativen IT-Alltag. Dazu gehören unter anderem IT-Support, System- und Arbeitsplatzbetreuung, technische Einsätze vor Ort, Content-Produktion, Motion Design, Web und die Umsetzung digitaler Lösungen für interne und externe Touchpoints.\n\nIn letzter Zeit verstärkter Fokus auf Prozessoptimierung und Workflow-Automatisierung mit KI – unter anderem durch die Entwicklung kleiner Apps, die Optimierung interner Abläufe und den Einsatz von API-basierten Tools, etwa für strukturierte Datensuche, Web Search Workflows und effizientere Informationsverarbeitung.',
    skills: ['Visual Design', 'Motion Graphics', 'Web', 'Content Production', 'Markenkommunikation', 'IT Support', 'Prozessoptimierung', 'Workflow Automation', 'KI-Integration', 'App Prototyping'],
  },
]

export const PROJECTS: Project[] = ([
  {
    id: 'rive-gaze-system',
    title: 'Interactive Rive System',
    category: 'Rive · Interaction',
    year: '2026',
    tagline: 'Interaktives System gemacht mit Rive-Artboards und State Machines.',
    description: 'Rive Experiment',
    size: 'tall' as const,
    accent: '#E8E2D9',
    tileRive: {
      src: '/rive/cursor_gaze.riv',
      artboard: 'redVertical',
      stateMachine: 'State Machine 1',
      background: '#E8E2D9',
    },
    detailRive: {
      src: '/rive/cursor_gaze.riv',
      artboard: 'Main',
      stateMachine: 'State Machine 1',
      background: '#F7F4F0',
    },
content: `Diese Rive-Datei funktioniert wie ein kleines visuelles System: Verschiedene Formate, Farbvarianten und Augen-Artboards können als interaktive Interface-Elemente eingesetzt werden.
Die Kachel auf der Startseite verwendet das Artboard „redVertical“ als individuelles Thumbnail. Auf der Detailseite wird das grössere „Main“-Artboard gezeigt, damit das System auf grösserer Fläche mehr Wirkung entfalten kann.
Der Fokus liegt nicht nur auf einem einzelnen fertigen Asset, sondern auf einem modularen Set visueller Bausteine, die später Navigation, Hover-States und kleine UI-Reaktionen unterstützen können.`,
tags: ['Rive', 'Artboards', 'Interaction Design', 'Visuelles System'],
  },
  {
    id: 'foto-workflow',
    title: 'Foto Workflow',
    category: 'IT · System · Automation',
    year: '2026',
    tagline: 'Hunderte Bilder. Richtig zugeordnet. In Echtzeit.',
    description: 'Ein internes Tool zur Automatisierung eines bislang manuellen Workflows: die Erfassung und strukturierte Zuordnung von Standfotos über mehrere Hallen und wechselnde Aussteller hinweg.',
    size: 'tall',
    accent: '#BFC8CC',
    image: '/work/foto-workflow/thumbnail.jpg',
    imageFit: 'contain',
    content: `Über die Dauer einer Messe entstehen mehrere hundert Bilder — aufgenommen über mehrere Tage, verteilt auf unterschiedliche Hallen und Aussteller, die teilweise mitten im Event wechseln. Die nachträgliche Zuordnung und Benennung dieser Bilder war bisher ein rein manueller Prozess: zeitaufwendig, fehleranfällig und schwer skalierbar.\n\nIch habe diesen Workflow neu gedacht und in eine strukturierte, digitale Lösung übersetzt.\n\nKern des Systems ist eine Web-App, die direkt während der Aufnahme genutzt wird. Anstatt Bilder im Nachhinein zu sortieren, werden sie bereits im Moment der Entstehung korrekt zugewiesen. Fotograf:innen wählen innerhalb der App die entsprechende Halle und den Aussteller aus, während die Kamera (über SD- oder Tether-Workflow) mit dem Laptop verbunden ist — dasselbe geht auch mit dem iPhone direkt über die Web-App. Neue Bilder werden automatisch erkannt, verarbeitet und dem gewählten Kontext zugeordnet.\n\nDie Anwendung wurde mit Unterstützung von Claude Code entwickelt und iterativ verbessert — insbesondere bei der Logikstruktur, API-Integration und beim schnellen Prototyping der Benutzeroberfläche. Zusätzlich kamen Lösungen für strukturierte Datenspeicherung und -abfrage zum Einsatz, um die Bilder zuverlässig und nachvollziehbar zu verwalten.\n\nNeben der deutlichen Zeitersparnis reduziert das System Fehlerquellen erheblich und schafft eine klare, skalierbare Struktur für zukünftige Events.`,
    tags: ['Web App', 'Workflow Automation', 'API Integration', 'Claude Code', 'Prototyping'],
    gallery: [
      { src: '/work/foto-workflow/thumbnail.jpg', label: 'Foto Workflow App' },
    ],
  },
  {
    id: 'zebi',
    title: 'zebi',
    category: 'Brand & Motion',
    year: '2025',
    tagline: 'Animierter Markenauftritt für den zentralschweizer Bildungstreffpunkt.',
    description: 'Ich habe die Animation für den Markenauftritt des zentralschweizer Bildungstreffpunkts zebi umgesetzt — eine lebendige, jugendlich-frische Bewegtbild-Identität.',
    size: 'small' as const,
    accent: '#7BBFBE',
    image: '/work/zebi/thumbnail.png',
    video: '/work/zebi/video.mp4',
    videos: [
      {
        src: '/work/zebi/halle4.mp4',
        label: 'Social Media Promotion — Lancierung Halle 4',
        aspectRatio: '9/16',
      },
    ],
  },
  {
    id: 'tpa-explainer',
    title: 'TPA Explainer Video',
    category: 'Motion · Video · UX',
    year: '2026',
    tagline: 'Komplexe Abläufe visuell geführt erlebbar machen.',
    description: 'Konzeption und Umsetzung eines Erklärvideos für das Ticketportal für Aussteller (TPA) der Messe Luzern, von der Struktur über die Vektorgrafik bis zur Animation.',
    size: 'small',
    accent: '#C8002A',
    image: '/work/tpa/thumbnail.png',
    youtubeId: 'wKoD7PpOio4',
    sections: [
      {
        body: 'Konzeption und Umsetzung eines Erklärvideos für das Ticketportal für Aussteller (TPA) der Messe Luzern.\n\nDas Portal wird von Ausstellern genutzt, um Tickets zu verwalten und zu versenden. In der Praxis führte die Nutzung jedoch häufig zu Unsicherheiten und Supportanfragen – nicht, weil das System komplex war, sondern weil die Abläufe nicht klar vermittelt wurden.\n\nZiel des Projekts war es, diese Hürde zu reduzieren und eine Lösung zu schaffen, die den Einstieg vereinfacht und gleichzeitig den Support entlastet.',
      },
      {
        title: 'Ansatz',
        body: 'Statt klassischer Screenrecordings habe ich mich bewusst für einen visualisierten Ansatz entschieden. Die Oberfläche des Portals wurde in Vektorgrafiken nachgebaut, um:',
        bullets: [
          'Gezielte Animationen auf Elementebene zu ermöglichen',
          'Abläufe klar und reduziert darzustellen',
          'Inhalte unabhängig von Bildschirmaufnahmen flexibel zu gestalten',
        ],
      },
      {
        body: 'Der Fokus lag darauf, das System nicht nur zu erklären, sondern verständlich und visuell geführt erlebbar zu machen.',
      },
      {
        title: 'Umsetzung',
        body: 'Das Video basiert auf einem durchgehenden Voiceover, das die Nutzer schrittweise durch die wichtigsten Funktionen führt. Technisch umgesetzt mit:',
        bullets: [
          'Adobe Illustrator — Strukturierung und Aufbau der UI als Vektorgrafik',
          'After Effects — Animation, Timing, Kameraführung',
          'Premiere Pro — Schnitt und Zusammenführung',
        ],
      },
    ],
    tags: ['Motion Design', 'After Effects', 'Illustrator', 'Premiere Pro', 'UX', 'Erklärfilm'],
  },
{
  id: 'rive-isocube',
  title: 'Isocube',
  category: 'Rive · Interactive Toy',
  year: '2026',
  tagline: 'Ein kleines isometrisches Rive-Objekt mit interaktivem Hover-State.',
  description: 'Ein interaktives Rive-Experiment mit einem isometrischen Objekt, das über eine State Machine auf Hover reagiert.',
  size: 'small',
  accent: '#D8B84A',

  tileRive: {
    src: '/rive/iso_toy_001.riv',
    artboard: 'isocube',
    stateMachine: 'State Machine 1',
    hoverInput: 'Hovered',
    background: '#F0E5B8',
  },

detailRive: {
  src: '/rive/iso_toy_001.riv',
  artboard: 'Artboard',
  stateMachine: 'State Machine 1',
  hoverInput: 'Hovered',
  background: '#F3F1E8',
},

  content: `Isocube ist ein kleines interaktives Rive-Experiment mit einem klaren Fokus auf Reaktion und Verhalten. Anders als eine reine Timeline-Animation arbeitet die Datei mit einer State Machine und einem eigenen Hover-Input namens „Hovered“.

Dadurch reagiert das Objekt direkt auf den Cursor: Bereits auf der Startseite wird der Hover-State ausgelöst, während auf der Detailseite das vollständige Artboard grösser und ruhiger präsentiert wird.

Das Projekt dient als erster Schritt in Richtung interaktiver UI-Bausteine, die sich weniger wie reine Dekoration und mehr wie echte Bestandteile eines lebendigen Interfaces anfühlen.`,

  tags: ['Rive', 'State Machine', 'Hover Interaction', 'Interactive Asset'],
},
  {
    id: 'it-support-web',
    title: 'IT & Web bei der Messe Luzern',
    category: 'IT · Support · Web',
    year: '2022 — Jetzt',
    tagline: 'Systeme am Laufen halten, Probleme lösen, digital umsetzen.',
    description: 'Operativer IT-Support, technische Einsätze vor Ort und digitale Aufgaben im Web — ein Einblick in meinen Alltag bei der Messe Luzern.',
    size: 'small',
    accent: '#C9C4BE',
    content: `In meiner Lehre bei der Messe Luzern bin ich hauptsächlich im operativen IT-Bereich tätig. Ich unterstütze im Support, richte Arbeitsplätze ein, konfiguriere Hardware und helfe dabei, Systeme wie das Ticketing im Alltag stabil am Laufen zu halten.\n\nEin grosser Teil meiner Arbeit passiert direkt im Einsatz – besonders während Veranstaltungen. Dort übernehme ich Verantwortung für technische Setups, unterstütze Teams vor Ort und sorge dafür, dass Kassensysteme auch unter Zeitdruck funktionieren.\n\nNeben dem IT-Alltag arbeite ich auch an digitalen und gestalterischen Aufgaben. Dazu gehören Webanpassungen im CMS und im Code auf Homepages oder Ticketshops, sowie das Erstellen von Grafiken für Web.`,
    tags: ['IT Support', 'Hardware', 'Ticketing', 'CMS', 'Webdesign', 'Vor-Ort-Einsatz'],
    gallery: [
      { src: '/work/it-support-web/ticketshop.png', label: 'Ticketshop — Luga 2026' },
      { src: '/work/it-support-web/ticketing-form.png', label: 'Ticketkauf-Formular' },
      { src: '/work/it-support-web/kassensetup.jpg', label: 'Kassensetup vor Ort' },
    ],
  },
  {
    id: 'swiss-plastics-awards',
    title: 'Swiss Plastics Awards',
    category: 'Motion · Event · Animation',
    year: '2026',
    tagline: 'Animationen für die Preisverleihung der Swiss Plastics Expo.',
    description: 'Im Rahmen der Preisverleihung verschiedener Kategorien an der Swiss Plastics Expo 2026 habe ich Animationen für die Nominierten und Gewinner erstellt.',
    size: 'small',
    accent: '#1A1A2E',
    image: '/work/swiss-plastics/thumbnail.png',
    content: `Im Rahmen einer Preisverleihung verschiedener Kategorien an der Swiss Plastics Expo 2026 brauchte die Messe eine angemessene Präsentation.\n\nIch habe verschiedene Animationen für die Nominierten und Gewinner erstellt — für jede Kategorie eine eigene Animation.`,
    videos: [
      {
        src: '/work/swiss-plastics/publikumsliebling.mp4',
        label: 'Winner — Publikumsliebling',
      },
      {
        src: '/work/swiss-plastics/produktinnovation.mp4',
        label: 'Winner — Produktinnovation',
      },
    ],
    tags: ['Motion Design', 'After Effects', 'Event', 'Messe Luzern'],
  },
  {
    id: 'blender-dots',
    title: 'Dots',
    category: 'Experiment · 3D · Blender',
    year: '2025',
    tagline: 'Geometry Nodes, Partikel, Atmosphäre.',
    description: 'Ein kleines Experiment — ein erstes Ausprobieren mit prozedural erstellten Objekten.',
    size: 'small',
    accent: '#0A1A14',
    image: '/work/blender-dots/thumbnail.png',
    video: '/work/blender-dots/video.mp4',
    content: `Ich bin mir gerade 3D am beibringen. Dieser Render wurde in Blender erstellt mit Geometry Nodes.`,
    tags: ['Blender', 'Geometry Nodes', 'Motion', '3D', 'Experiment'],
    noPage: true,
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    category: 'Web · Design · Code',
    year: '2026',
    tagline: 'Diese Website — gebaut mit Next.js, Framer Motion und viel Detailarbeit.',
    description: 'Konzeption und Umsetzung meiner eigenen Portfolio-Website. Von der Interaktionslogik über das Cursor-System bis zur Typografie — alles selbst gebaut.',
    size: 'small',
    accent: '#E8E2D9',
    image: '/work/portfolio/thumbnail.png',
    sections: [
      {
        body: 'Diese Website habe ich von Grund auf selbst konzipiert und umgesetzt — Design, Interaktionslogik und Code. Die Programmierung erfolgte mithilfe von KI (Claude Code), was schnelles Prototyping und iterative Verbesserung ermöglichte. Die Entscheidungen dahinter, was gebaut wird, wie es sich anfühlt, was weggelassen wird, sind alle meine eigenen.',
      },
      {
        title: 'Stack',
        bullets: [
          'Next.js 14 — App Router, statische Generierung für Projektseiten',
          'TypeScript — durchgehend typsicher',
          'Tailwind CSS v3 — eigene Design-Tokens, fluide Typskala',
          'Framer Motion v11 — Spring-Physics, AnimatePresence, useScroll',
        ],
      },
      {
        title: 'Interaktion',
        bullets: [
          'Magnetische Buttons mit Falloff-Mathematik',
          'Kontextsensitiver Cursor (default, hover-text, hover-card)',
          'Scroll-Fortschrittsbalken mit Spring-Glättung',
          'Abschnittsindikator mit IntersectionObserver',
        ],
      },
      {
        title: 'Design',
        body: 'Warmes Off-White (#F7F4F0) als Basis, Near-Black (#181614) als Text. Plus Jakarta Sans. Keine ablenkenden Effekte — Inhalt first.',
      },
    ],
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Selbst gebaut', 'KI-unterstützt'],
  },
] as Project[]).filter((project) => !['foto-workflow', 'it-support-web'].includes(project.id))
