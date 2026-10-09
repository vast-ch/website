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
    bases: 'Interlaken · Brig · Fribourg',
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
    services: 'Offres',
    approach: 'Approche',
    about: 'À propos',
    contact: 'Contact',
    linkedin: 'LinkedIn',
    github: 'GitHub',
  },

  home: {
    meta: {
      title: 'vast — Des résultats mesurables pour les bâtiments, l’énergie et l’environnement',
      description:
        'Vast est un petit studio d’ingénierie suisse. Nous combinons ingénierie, machine learning appliqué et connaissance des bâtiments, de l’énergie et de l’environnement pour livrer des résultats mesurables et des preuves vérifiables.',
    },
    hero: `Des <a href="${r('services')}">résultats mesurables</a> pour les bâtiments, l’énergie et l’environnement.<br />Des données fiables, des résultats <a href="${r('approach')}">démontrables</a>.`,
    links: { services: 'Nos offres', contact: 'Nous écrire' },
  },

  services: {
    meta: {
      title: 'Offres',
      description:
        'Cinq façons de travailler avec Vast : sprints d’optimisation des processus, conformité et reporting, monitoring et consolidation des données, modèles validés et benchmarking, de la recherche à la pratique.',
    },
    label: 'Offres',
    heading:
      'Nous ne vendons pas du logiciel. Nous vendons des résultats mesurables, des preuves vérifiables et un partenaire qui reste responsable.',
    intro: [
      'Développer un logiciel coûte de moins en moins cher. Ce qui reste rare, c’est de savoir quel problème mérite d’être résolu, de prouver qu’une solution fonctionne dans le monde réel et de maîtriser les données qui la rendent fiable. C’est précisément à ce niveau que Vast intervient.',
      'Nous combinons ingénierie, machine learning appliqué et connaissance approfondie des bâtiments, de l’énergie et de l’environnement. Chaque mandat est conçu pour vous laisser un résultat exploitable, une trace qui le prouve et un système qui continue de fonctionner après notre départ.',
    ],
    listLabel: 'Cinq offres',
    labels: {
      audience: 'Pour qui',
      deliverables: 'Ce que vous obtenez',
      how: 'Comment ça marche',
      pricing: 'Tarification',
      why: 'Pourquoi ça marche',
      start: 'Pour commencer',
      write: 'Nous écrire à ce sujet',
    },
    offers: [
      {
        id: 'process-sprint',
        title: 'Sprint d’optimisation des processus',
        headline: 'Un processus pénible, réglé en trois semaines.',
        promise:
          'Nous identifions le processus qui coûte le plus de temps à votre équipe, nous cartographions son fonctionnement réel et nous éliminons les frictions. Vous obtenez une amélioration qui fonctionne, pas un rapport.',
        audience:
          'Les petites et moyennes organisations dont les processus se sont construits par habitude plutôt que par conception, où une seule personne détient le savoir et où tous les autres courent après des e-mails et des tableurs.',
        deliverables: [
          'Une carte claire du fonctionnement réel du processus, y compris les étapes que personne n’a jamais documentées.',
          'Les corrections les plus rentables, mises en œuvre : automatisation des tâches répétitives, connexions entre les outils que vous utilisez déjà, suppression des doubles saisies.',
          'Une documentation qui sort le processus de la tête d’une seule personne, pour que votre organisation ne dépende plus de sa présence.',
          'Une courte liste des prochaines améliorations, classées par retour sur investissement.',
        ],
        how: 'Une semaine pour observer et cartographier, deux semaines pour construire et transmettre. Nous travaillons autant que possible dans vos outils existants : votre équipe garde ses habitudes et perd ses irritants.',
        pricing: 'Prix fixe, périmètre fixe. Vous connaissez le coût avant que nous commencions.',
        why: 'Les outils sont bon marché. Savoir quelle friction éliminer ne l’est pas. Nous apportons le jugement, vous gardez le résultat.',
        cta: 'Dites-nous de quel processus votre équipe se plaint le plus. Nous vous dirons en une semaine s’il vaut la peine d’être corrigé, et ce que cela demanderait.',
      },
      {
        id: 'compliance-reporting',
        title: 'Conformité et reporting, clés en main',
        headline:
          'Vos rapports énergétiques et environnementaux, pris en charge. À chaque échéance. Exactitude garantie.',
        promise:
          'Nous reprenons les rapports que votre équipe redoute : déclarations énergétiques, bilans d’émissions et de carbone, déclarations environnementales. Vous validez. Nous faisons le reste, et nous répondons des chiffres.',
        audience:
          'Propriétaires immobiliers, gestionnaires d’installations, communes et entreprises soumis aux réglementations sur l’énergie, les bâtiments et l’environnement, sans personne qui ait le temps ou l’expertise pour s’en charger.',
        deliverables: [
          'Des rapports livrés dans les délais, au format exigé par l’autorité ou la norme.',
          'Des chiffres rattachés à leur source, pour que chaque valeur puisse être défendue en cas de question.',
          'Un interlocuteur unique qui comprend à la fois la réglementation et les données qui la sous-tendent.',
          'Un historique consolidé de vos performances, qui prend de la valeur d’année en année.',
        ],
        how: 'Nous nous connectons une seule fois à vos compteurs, factures et données de bâtiment. Ensuite, chaque cycle de reporting se déroule selon le calendrier, avec un minimum d’intervention de votre part. Quand la réglementation change, nous adaptons le processus avant l’échéance, pas après.',
        pricing:
          'Abonnement annuel par site ou par portefeuille, calculé selon l’obligation de reporting, pas selon les heures.',
        why: 'La conformité est un coût récurrent et un risque récurrent. La confier à un partenaire qui porte les deux revient moins cher que de développer l’expertise en interne, et c’est plus sûr que d’espérer qu’un tableur soit juste.',
        cta: 'Envoyez-nous votre dernier rapport et la réglementation à laquelle il répond. Nous vous montrerons où se situent l’effort et le risque, et ce que coûterait leur élimination.',
      },
      {
        id: 'monitoring',
        title: 'Monitoring et consolidation des données',
        headline:
          'Toutes vos données énergétiques et environnementales en un seul endroit fiable, surveillées en permanence.',
        promise:
          'Nous rassemblons les données dispersées entre vos compteurs, capteurs, installations techniques et tableurs, nous les gardons propres, et nous vous avertissons quand quelque chose dérape, avant que cela ne vous coûte.',
        audience:
          'Les exploitants de bâtiments, de réseaux de chaleur, de systèmes énergétiques et de dispositifs de surveillance environnementale qui ont plus de données que d’informations utiles, et qui découvrent les pannes sur la facture plutôt que dans le système.',
        deliverables: [
          'Un historique unique, consolidé et mis à jour en continu de vos données d’énergie, de climat et d’environnement.',
          'La détection automatique des anomalies : fuites, capteurs qui dérivent, équipements qui sortent de leur fonctionnement normal, consommations inexpliquées.',
          'Des alertes qui atteignent la bonne personne, avec assez de contexte pour agir.',
          'Une revue mensuelle de ce que montrent les données et de ce qu’elles suggèrent de changer.',
        ],
        extra: {
          label: 'Périmètre type',
          text: 'Consommation d’électricité, de chaleur et d’eau ; climat intérieur et qualité de l’air ; réseaux de chauffage à distance ; capteurs environnementaux sur site et sur le terrain.',
        },
        how: 'Nous connectons vos sources existantes, sans nouveau matériel sauf si vous le souhaitez. Les données alimentent une plateforme de séries temporelles que nous exploitons pour vous. Nos modèles de détection apprennent ce qui est normal pour vos systèmes et signalent ce qui s’en écarte.',
        pricing:
          'Service mensuel par site, réseau ou flux de données. Le prix suit ce que nous surveillons, pas la fréquence de vos questions.',
        why: 'Collecter des données est facile. Comprendre ce qu’elles signifient, chaque jour, sans que quelqu’un fixe des tableaux de bord : c’est cela, le service. Plus nous observons longtemps, meilleure est la détection.',
        cta: 'Listez vos sources de données, même les plus désordonnées. Nous vous dirons ce que nous pouvons consolider le premier mois et ce que nous nous attendons à y trouver.',
      },
      {
        id: 'validated-models',
        title: 'Modèles validés et benchmarking',
        headline: 'Des prévisions que vous pouvez défendre, parce que nous les confrontons à la réalité.',
        promise:
          'Nous modélisons vos bâtiments, vos systèmes énergétiques ou vos risques environnementaux, nous validons ces modèles sur des résultats mesurés et nous vous situons par rapport à des sites comparables. Vous payez pour une précision vérifiable, pas pour un modèle qui fait bonne figure sur le papier.',
        audience:
          'Propriétaires de portefeuilles, services industriels, collectivités publiques et organisations tournées vers la recherche qui doivent estimer, prévoir ou prioriser à grande échelle : consommation d’énergie, potentiel de rénovation, exposition aux risques environnementaux, performance attendue d’une mesure avant son financement.',
        deliverables: [
          'Un modèle ajusté à vos données et documenté pour qu’un tiers puisse l’auditer.',
          'Un rapport de validation qui montre les performances du modèle face aux mesures réelles, avec ses limites clairement énoncées.',
          'Des benchmarks qui situent chaque site ou actif par rapport à ses pairs, pour investir là où l’écart est le plus grand.',
          'Des prévisions et des scénarios que vous pouvez présenter à un conseil d’administration, à un bailleur de fonds ou à une autorité.',
        ],
        extra: {
          label: 'Questions types',
          text: 'Quels bâtiments de ce portefeuille gaspillent le plus d’énergie ? Que permettra vraiment d’économiser cette rénovation ? Quels sites présentent le plus grand risque pour le climat intérieur ? À quoi ressemblera la consommation l’hiver prochain ?',
        },
        how: 'Nous partons des données que vous possédez déjà et les enrichissons avec des sources publiques et géospatiales. Les modèles sont testés sur des mesures mises de côté avant d’être utilisés. Les résultats sont accompagnés de leur incertitude, car un chiffre sans incertitude n’est qu’une supposition.',
        pricing:
          'Un prix de projet pour le modèle et sa validation, puis un forfait annuel pour le tenir à jour à mesure que de nouvelles données arrivent. Lorsque les résultats peuvent être mesurés, une partie de la rémunération peut y être liée.',
        why: 'Aujourd’hui, n’importe qui peut produire un modèle. Peu peuvent prouver qu’il fonctionne, et cette preuve exige des données réelles, des résultats réels et un historique. C’est ce que vous achetez.',
        cta: 'Dites-nous quelle décision vous devez prendre et de quelles données vous disposez. Nous vous dirons ce qui peut être estimé, avec quelle précision, et ce que cela demanderait.',
      },
      {
        id: 'research-to-practice',
        title: 'De la recherche à la pratique',
        headline: 'La méthode existe dans une publication. Nous la faisons fonctionner dans votre système.',
        promise:
          'Nous sélectionnons des techniques de pointe issues de la recherche, évaluons lesquelles sont assez mûres pour qu’on s’y fie, et les intégrons dans vos opérations réelles. Vous profitez de l’état de l’art sans servir de cobaye.',
        audience:
          'Entreprises, services industriels et collectivités publiques qui savent qu’une meilleure méthode existe, mais n’ont personne pour l’évaluer et la déployer. Groupes de recherche et programmes d’innovation qui ont besoin qu’un prototype devienne un produit.',
        deliverables: [
          'Une évaluation honnête des méthodes prêtes pour la production et de celles qui restent académiques.',
          'Une intégration fonctionnelle dans vos systèmes, construite pour être maintenue, pas pour une seule démonstration.',
          'Un transfert de compréhension à votre équipe, pour que vous ne dépendiez pas de nous pour l’exploiter.',
          'Si pertinent, une voie vers des projets d’innovation cofinancés avec des partenaires académiques.',
        ],
        extra: {
          label: 'Travaux types',
          text: 'Prévision de séries temporelles et détection d’anomalies sur des données d’infrastructure ; modèles d’estimation à partir de données géospatiales et de bâtiments ; pipelines de machine learning qui remplacent l’évaluation manuelle par des experts ; prototypes rapides pour tester une idée en quelques semaines plutôt qu’en quelques trimestres.',
        },
        how: 'Une courte phase de cadrage pour associer le problème à la bonne méthode. Puis un développement itératif avec des jalons mesurables, chacun validé sur vos données. Nous nous arrêtons quand le résultat est prouvé, pas quand le budget est épuisé.',
        pricing:
          'Cadrage à prix fixe. Développement par jalons, chacun avec un livrable et un critère d’acceptation définis.',
        why: 'C’est dans l’écart entre un résultat publié et un système fiable que la plupart des projets échouent. Nous l’avons franchi à plusieurs reprises, dans des contextes académiques comme commerciaux, et nous savons quels raccourcis sont sûrs.',
        cta: 'Partagez la publication, le problème ou le prototype. Nous vous dirons si cela peut fonctionner, et ce qu’il faudrait pour y arriver.',
      },
    ],
    outro: `Vous ne savez pas laquelle choisir ? La plupart de nos clients commencent petit et élargissent à mesure que la confiance et les données s’accumulent. <a href="${r('approach')}#where-to-start">Voir par où commencer</a>, ou <a href="${r('contact')}">décrivez-nous simplement le problème</a>.`,
  },

  approach: {
    meta: {
      title: 'Approche',
      description:
        'Comment Vast travaille : des résultats plutôt que des heures, la preuve incluse, une personne responsable, vos outils d’abord, vos données restent les vôtres, conçu pour durer.',
    },
    label: 'Approche',
    heading: 'Notre façon de travailler',
    principles: [
      {
        title: 'Des résultats, pas des heures.',
        text: 'Chaque offre est facturée sur un résultat : un processus corrigé, un rapport livré, un système surveillé, un modèle prouvé. Vous ne payez jamais pour un effort que vous ne voyez pas.',
      },
      {
        title: 'La preuve incluse.',
        text: 'Nous documentons la manière dont chaque chiffre a été produit. Si un chiffre ne peut pas être rattaché à sa source, nous ne le publions pas.',
      },
      {
        title: 'Une personne responsable.',
        text: 'Vous traitez avec l’ingénieur qui a fait le travail, pas avec un chargé de compte. Quand quelque chose doit être expliqué ou corrigé, la personne capable de le faire est celle que vous appelez.',
      },
      {
        title: 'Vos outils d’abord.',
        text: 'Nous construisons dans ce que vous utilisez déjà, dès que c’est solide. Un nouveau logiciel est un dernier recours, pas un réflexe.',
      },
      {
        title: 'Vos données restent les vôtres.',
        text: 'Vous êtes propriétaire de vos données et pouvez les reprendre à tout moment. Lorsque nous conservons des données pour améliorer nos modèles et nos benchmarks, nous le faisons uniquement avec votre accord écrit, sous forme agrégée ou anonymisée, et dans le plein respect de la loi suisse sur la protection des données.',
      },
      {
        title: 'Conçu pour durer.',
        text: 'Ce que nous livrons est documenté, maintenable et transmis dans les règles. Vous n’êtes jamais prisonnier d’un code que nous seuls comprenons.',
      },
      {
        title: 'Nos valeurs sont un critère de sélection.',
        text: 'Nous travaillons avec des organisations dont nous sommes heureux de renforcer l’activité : l’énergie, les bâtiments, la recherche appliquée, les activités de plein air, ainsi que les organismes publics et à but non lucratif qui les servent.',
      },
    ],
    start: {
      heading: 'Par où commencer',
      intro:
        'La plupart de nos clients commencent petit et élargissent à mesure que la confiance et les données s’accumulent. La progression naturelle :',
      steps: [
        {
          title: 'Commencer par un sprint.',
          text: `Un <a href="${r('services')}#process-sprint">sprint d’optimisation des processus</a> ou un seul cycle de reporting. Peu d’engagement, un résultat visible en moins d’un mois, et nous apprenons comment votre organisation fonctionne vraiment.`,
        },
        {
          title: 'Passer à un service récurrent.',
          text: `<a href="${r('services')}#compliance-reporting">Conformité et reporting</a> ou <a href="${r('services')}#monitoring">monitoring</a>. Vos données commencent à s’accumuler en un seul endroit fiable, et chaque cycle devient moins cher et plus fiable que le précédent.`,
        },
        {
          title: 'Bâtir sur l’historique.',
          text: `Avec une année ou plus de données consolidées, les <a href="${r('services')}#validated-models">modèles validés et le benchmarking</a> deviennent possibles et précis. Vos décisions d’investissement reposent désormais sur vos propres preuves.`,
        },
        {
          title: 'Viser l’état de l’art quand cela en vaut la peine.',
          text: `<a href="${r('services')}#research-to-practice">De la recherche à la pratique</a>, pour les problèmes où une meilleure méthode changerait l’équation économique.`,
        },
      ],
    },
    oneLiner: {
      label: 'En une phrase',
      text: 'Nous commençons par régler quelque chose de concret. Si cela fonctionne, nous continuons. Sinon, vous avez perdu trois semaines et appris quelque chose.',
    },
    outro: `<a href="${r('contact')}">Dites-nous où ça coince</a>.`,
  },

  about: {
    meta: {
      title: 'À propos',
      description:
        'Vast Switzerland GmbH est un petit studio d’ingénierie suisse présent à Interlaken, Brig et Fribourg, actif dans les bâtiments, l’énergie et l’environnement.',
    },
    label: 'À propos',
    intro: `<a href="${r('home')}">Vast Switzerland GmbH</a> est un petit studio d’ingénierie suisse fondé par <a href="https://ch.linkedin.com/in/fredmontet" target="_blank" rel="noopener noreferrer">Frédéric Montet</a>, <a href="https://www.linkedin.com/in/michalbryxi/" target="_blank" rel="noopener noreferrer">Michal Bryxí</a> et <a href="https://www.linkedin.com/in/yannick-lagger-302070193/" target="_blank" rel="noopener noreferrer">Yannick Lagger</a>.`,
    sections: [
      {
        title: 'Ingénierie, données et connaissance du terrain',
        text: 'Nous combinons développement logiciel, machine learning appliqué et connaissance approfondie des bâtiments, de l’énergie et de l’environnement. Nos travaux de modélisation sont menés au niveau doctoral et s’appuient sur la recherche évaluée par les pairs. Nos logiciels sont construits pour être maintenus, pas pour une seule démonstration.',
      },
      {
        title: 'Ouverts par principe',
        text: 'Nous publions nos recherches et développons onTime, une bibliothèque open source pour comparer les modèles de prévision de séries temporelles. Vous pouvez vérifier nos affirmations plutôt que de nous croire sur parole.',
      },
      {
        title: 'Ancrés en Suisse',
        text: 'Vous nous trouverez à Interlaken, à Brig et à Fribourg. Nous travaillons en français, en allemand et en anglais, et nous savons comment les choses se font ici.',
      },
      {
        title: 'Pourquoi les bâtiments, l’énergie et l’environnement',
        text: `C’est là que de meilleures données se traduisent le plus directement par moins de gaspillage. Nous choisissons des clients dont nous sommes heureux de renforcer l’activité, et nous restons responsables de ce que nous livrons. <a href="${r('approach')}">Découvrir notre façon de travailler</a>.`,
      },
    ],
    tagline: 'Pour un monde où les êtres humains et la nature prospèrent ensemble.',
  },

  contact: {
    meta: {
      title: 'Contact',
      description:
        'Écrivez à Vast en français, en allemand ou en anglais. Décrivez-nous le problème et nous vous dirons honnêtement si nous pouvons aider.',
    },
    label: 'Contact',
    heading: 'Décrivez-nous le problème. Nous vous dirons honnêtement si nous pouvons aider.',
    intro:
      'Écrivez-nous en français, en allemand ou en anglais. Vous recevrez une réponse de l’ingénieur qui ferait le travail, pas d’un chargé de compte.',
    emailLabel: 'E-mail',
    offersLabel: 'Ou partez de l’une de ces offres',
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
