import { ROUTES } from './config';
import type { Dictionary } from './types';

const r = (key: keyof typeof ROUTES) => ROUTES[key].fr;

/**
 * French typography: the plain spaces written before « ; : ! ? » below are
 * turned into narrow no-break spaces, so punctuation never wraps onto its own
 * line. Keeps the source readable.
 */
const typography = <T>(value: T): T => {
  if (typeof value === 'string') {
    return value.replace(/ ([;:!?»])/g, ' $1').replace(/« /g, '« ') as T;
  }
  if (Array.isArray(value)) return value.map(typography) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, typography(v)])) as T;
  }
  return value;
};

export const fr: Dictionary = typography<Dictionary>({
  locale: 'fr',

  chrome: {
    company: 'Vast Switzerland GmbH',
    skipToContent: 'Aller au contenu',
    primaryNav: 'Navigation principale',
    externalLinks: 'Ailleurs',
    menu: 'Menu',
    close: 'Fermer',
    language: 'Langue',
    languageNames: { en: 'English', fr: 'Français' },
    theme: { label: 'Apparence', auto: 'Auto', light: 'Clair', dark: 'Sombre' },
  },

  nav: {
    home: 'Accueil',
    services: 'Services',
    approach: 'Approche',
    about: 'À propos',
    contact: 'Contact',
    linkedin: 'LinkedIn',
    github: 'GitHub',
  },

  home: {
    meta: {
      title: 'vast — Logiciels et machine learning, développés avec vous',
      description:
        'Vast est une petite société de conseil suisse composée de développeurs expérimentés. Nous développons des applications web et mobiles et des logiciels sur mesure avec nos clients, ainsi que des modèles de machine learning pour les séries temporelles.',
    },
    hero: `<a href="${r('services')}">Logiciels et machine learning</a>, développés avec vous.<br />Une petite équipe suisse expérimentée, pour <a href="${r('about')}">les humains et la nature</a>.`,
    links: { services: 'Ce que nous faisons', contact: 'Nous écrire' },
  },

  services: {
    meta: {
      title: 'Services',
      description:
        'Applications web et mobiles, développement de logiciels sur mesure et machine learning pour les séries temporelles : prévision et détection d’anomalies.',
    },
    label: 'Services',
    heading: 'Nous développons des logiciels avec nos clients.',
    intro: [
      'Vast est une petite société de conseil composée de développeurs expérimentés. Nous développons des applications web et mobiles et des logiciels sur mesure, ainsi que des modèles de machine learning pour les séries temporelles, de la prévision à la détection d’anomalies.',
      'Nous travaillons étroitement avec votre équipe, montrons l’avancement tôt et gardons les choses simples. Chaque projet commence par une discussion et une première étape modeste, pour que vous puissiez voir comment nous travaillons avant de vous engager davantage.',
    ],
    listLabel: 'Ce que nous faisons',
    labels: {
      audience: 'Pour qui',
      deliverables: 'Ce que cela peut inclure',
      how: 'Notre façon de faire',
      pricing: 'Tarification',
      why: 'Expérience',
      start: 'Pour commencer',
      write: 'Nous écrire à ce sujet',
    },
    offers: [
      {
        id: 'web-and-mobile',
        title: 'Applications web et mobiles',
        headline: 'Du premier prototype à l’application en production.',
        promise:
          'Nous concevons et développons des applications web et des applications mobiles multiplateformes pour iOS et Android, et nous pouvons continuer à les faire évoluer après leur lancement.',
        audience:
          'Les organisations qui ont besoin d’une nouvelle application, veulent remplacer un outil devenu trop grand pour son tableur, ou souhaitent faire évoluer une application existante.',
        deliverables: [
          'Des applications web, du site simple à l’outil métier conçu pour durer.',
          'Des applications mobiles pour iOS et Android à partir d’une seule base de code, publiées sur les stores.',
          'Le backend et les API qui les font fonctionner.',
          'La maintenance et les évolutions après le lancement.',
        ],
        how: 'Nous commençons petit, avec un prototype ou une première version utilisable, puis avançons par itérations courtes avec vos retours. Nous choisissons des technologies éprouvées et bien documentées, que votre équipe ou un autre prestataire pourra maintenir.',
        why: 'Nous mettons en production des applications web et mobiles depuis des années, y compris des applications publiées sur l’App Store et Google Play.',
        cta: 'Parlez-nous de l’application que vous avez en tête, même si ce n’est qu’une idée approximative. Nous vous dirons comment nous l’aborderions.',
      },
      {
        id: 'software',
        title: 'Développement de logiciels sur mesure',
        headline: 'Des logiciels construits autour de la façon dont votre organisation travaille vraiment.',
        promise:
          'Nous développons les logiciels qu’on ne trouve pas sur étagère : outils internes, intégrations entre systèmes, automatisations et pipelines de données.',
        audience:
          'Les équipes dont le travail repose sur des étapes manuelles, des données recopiées et des outils qui ne communiquent pas entre eux.',
        deliverables: [
          'Des outils internes qui remplacent des tableurs fragiles et des tâches manuelles répétitives.',
          'Des intégrations entre les systèmes que vous utilisez déjà.',
          'Des pipelines qui collectent, nettoient et stockent vos données de manière fiable.',
          'Des revues de code ou d’architecture existants, avec des recommandations écrites.',
        ],
        how: 'Nous regardons comment le travail se fait aujourd’hui avant d’écrire la moindre ligne de code, puis nous construisons par petites étapes. Quand un outil existant fait déjà l’affaire, nous le disons.',
        why: 'À nous tous, nous couvrons le frontend, le mobile, le backend, les données et l’infrastructure : une petite équipe peut mener un projet du début à la fin.',
        cta: 'Décrivez-nous la tâche manuelle ou l’outil manquant qui ralentit votre équipe. Nous vous dirons honnêtement si un logiciel est la bonne réponse.',
      },
      {
        id: 'time-series',
        title: 'Machine learning pour les séries temporelles',
        headline: 'Prévision et détection d’anomalies sur vos données de mesure.',
        promise:
          'Nous développons des modèles de machine learning pour les séries temporelles, comme des prévisions de consommation ou la détection de comportements anormaux, ainsi que les pipelines de données qui les alimentent.',
        audience:
          'Les organisations qui disposent de données de capteurs, de compteurs ou d’exploitation, en particulier dans l’énergie et les bâtiments, et qui veulent anticiper la suite ou repérer les problèmes plus tôt.',
        deliverables: [
          'Des modèles de prévision, des méthodes statistiques classiques au machine learning moderne.',
          'De la détection d’anomalies sur des données de capteurs et de compteurs.',
          'Le pipeline autour du modèle, des mesures brutes jusqu’à des résultats exploitables.',
          'Une documentation du fonctionnement du modèle et de ses limites.',
        ],
        extra: {
          label: 'Issu de nos recherches',
          text: 'Estimation de la performance énergétique des bâtiments ; détection d’anomalies dans les réseaux de chauffage à distance ; comparaison de modèles de prévision, y compris des modèles de fondation pour séries temporelles, avec onTime, notre bibliothèque open source.',
        },
        how: 'Nous partons des données dont vous disposez et vérifions ce qu’elles permettent avant de construire quoi que ce soit de complexe. Chaque modèle est comparé à des références simples et testé sur des données qu’il n’a jamais vues.',
        why: 'Nos travaux de machine learning sont menés par un docteur en informatique spécialisé en science des données pour le secteur de l’énergie, auteur de publications évaluées par les pairs.',
        cta: 'Dites-nous ce que vous aimeriez prévoir ou détecter, et de quelles données vous disposez. Nous vous dirons honnêtement ce qui nous semble faisable.',
      },
    ],
    outro: `Vous ne savez pas où situer votre projet ? <a href="${r('contact')}">Parlez-nous-en simplement</a>. Si nous ne sommes pas la bonne équipe, nous vous le dirons.`,
  },

  approach: {
    meta: {
      title: 'Approche',
      description:
        'Comment Vast travaille : uniquement des développeurs expérimentés, des logiciels construits avec vous, une première étape modeste, l’honnêteté, la souveraineté sur votre code et vos données, et le respect de l’environnement.',
    },
    label: 'Approche',
    heading: 'Notre façon de travailler',
    principles: [
      {
        title: 'Uniquement des personnes expérimentées.',
        text: 'Toutes les personnes qui travaillent sur votre projet sont des développeurs expérimentés. C’est ce qui permet à une petite équipe d’arriver rapidement à de bons résultats.',
      },
      {
        title: 'Construit avec vous.',
        text: 'Nous développons les logiciels avec nos clients, pas en vase clos. Vous voyez l’avancement tôt, donnez vos retours souvent, et votre équipe apprend en chemin.',
      },
      {
        title: 'Une première étape modeste.',
        text: 'Nous commençons par un premier travail bien défini, pour que vous puissiez juger notre façon de travailler avant de vous engager davantage.',
      },
      {
        title: 'Honnêtes sur ce que nous savons.',
        text: 'Nous vous disons ce dont nous sommes sûrs, ce dont nous ne le sommes pas, et quand quelque chose ne vaut pas la peine d’être développé.',
      },
      {
        title: 'Souveraineté.',
        text: 'Votre code, vos données et votre infrastructure restent les vôtres. Nous privilégions les standards ouverts, les outils open source et l’hébergement en Suisse ou en Europe, pour que vous ne soyez jamais captif, pas même de nous.',
      },
      {
        title: 'Respect de l’environnement.',
        text: 'Nous voulons que notre travail soit bon pour les êtres humains et pour la nature. Nous sommes particulièrement heureux de travailler sur l’énergie, les bâtiments et l’environnement, et nous gardons ce que nous construisons aussi sobre que le problème le permet.',
      },
    ],
    start: {
      heading: 'Par où commencer',
      intro: 'La plupart des collaborations commencent petit :',
      steps: [
        {
          title: 'Une courte discussion.',
          text: 'Trente minutes en français, en allemand ou en anglais avec les développeurs qui feraient le travail. Si nous ne sommes pas la bonne équipe, nous vous le dirons.',
        },
        {
          title: 'Une première étape bien définie.',
          text: 'Un prototype, une première version ou une courte analyse de vos données, avec un périmètre clair et un prix.',
        },
        {
          title: 'Des itérations courtes.',
          text: 'Du logiciel qui fonctionne tôt, des points réguliers, et une documentation écrite pour celles et ceux qui le maintiendront ensuite.',
        },
        {
          title: 'Puis décider ensemble.',
          text: 'Si cela fonctionne, nous continuons, à prix fixe par jalon ou au tarif journalier. Sinon, vous avez peu dépensé et appris quelque chose.',
        },
      ],
    },
    oneLiner: {
      label: 'En une phrase',
      text: 'Nous commençons petit, construisons avec vous et vous disons honnêtement où nous en sommes.',
    },
    outro: `<a href="${r('contact')}">Parlez-nous de votre projet</a>.`,
  },

  about: {
    meta: {
      title: 'À propos',
      description:
        'Vast Switzerland GmbH est une petite société de conseil suisse composée de développeurs expérimentés, présente à Interlaken, Brig et Fribourg. Nous tenons à la souveraineté et au respect de l’environnement.',
    },
    label: 'À propos',
    intro: `<a href="${r('home')}">Vast Switzerland GmbH</a> est une petite société de conseil suisse. Nous développons des logiciels avec nos clients, ainsi que des modèles de machine learning pour les séries temporelles.`,
    sections: [
      {
        title: 'Qui nous sommes',
        text: `Vast est dirigée par ses fondateurs, tous développeurs expérimentés. <a href="https://ch.linkedin.com/in/fredmontet" target="_blank" rel="noopener noreferrer">Frédéric Montet</a> travaille sur la science des données et la prévision de séries temporelles. <a href="https://www.linkedin.com/in/michalbryxi/" target="_blank" rel="noopener noreferrer">Michal Bryxí</a> est ingénieur logiciel orienté frontend et contribue depuis longtemps à Ember et à l’écosystème JavaScript. <a href="https://www.linkedin.com/in/yannick-lagger-302070193/" target="_blank" rel="noopener noreferrer">Yannick Lagger</a> développe des applications mobiles et web, dont des applications publiées sur l’App Store et Google Play.`,
      },
      {
        title: 'La science des données au service de l’énergie',
        text: 'Frédéric est docteur en informatique de la HES-SO. Ses recherches ont porté sur l’estimation de la performance énergétique des bâtiments, la détection d’anomalies dans les réseaux de chauffage à distance et la comparaison de modèles de prévision. Nous publions nos recherches et développons onTime, une bibliothèque open source pour comparer les modèles de prévision de séries temporelles.',
      },
      {
        title: 'Souveraineté et environnement',
        text: `Nous tenons à savoir qui contrôle les logiciels et les données, et sur quelle planète ils tournent. Nous privilégions les outils open source et l’hébergement en Suisse ou en Europe, et nous sommes heureux de travailler sur des projets utiles aux êtres humains et à la nature. <a href="${r('approach')}">Découvrir notre façon de travailler</a>.`,
      },
      {
        title: 'Ancrés en Suisse',
        text: 'Vous nous trouverez à Interlaken, à Brig et à Fribourg. Nous travaillons en français, en allemand et en anglais.',
      },
    ],
    tagline: 'Pour un monde où les êtres humains et la nature prospèrent ensemble.',
  },

  contact: {
    meta: {
      title: 'Contact',
      description:
        'Écrivez à Vast en français, en allemand ou en anglais. Parlez-nous de votre projet et nous vous dirons honnêtement si nous pouvons aider.',
    },
    label: 'Contact',
    heading: 'Parlez-nous de votre projet. Nous vous dirons honnêtement si nous pouvons aider.',
    intro:
      'Écrivez-nous en français, en allemand ou en anglais. Une idée approximative suffit. Vous recevrez une réponse des développeurs qui feraient le travail.',
    emailLabel: 'E-mail',
    offersLabel: 'Ou partez de l’un de ces services',
    write: 'Nous écrire à ce sujet',
    addressLabel: 'Siège',
    address: ['Vast Switzerland GmbH', 'c/o Seed: Lab', 'Chemin du Musée 4', '1700 Fribourg', 'Suisse'],
    elsewhereLabel: 'Ailleurs',
    smallPrint: `<a href="/terms">Conditions d’utilisation</a> (en anglais)`,
  },

  notFound: {
    meta: { title: 'Page introuvable', description: 'Cette page est introuvable.' },
    heading: 'Cette page s’est perdue dans les nuages.',
    back: 'Retour à l’accueil',
  },
});
