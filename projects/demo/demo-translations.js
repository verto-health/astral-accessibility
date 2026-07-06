export const DEMO_TRANSLATIONS = {
  en: {
    nav: {
      home: "Home",
      screenReader: "Screen Reader",
      contrast: "Contrast",
      saturation: "Saturation",
      biggerText: "Bigger Text",
      textSpacing: "Text Spacing",
      screenMask: "Screen Mask",
      lineHeight: "Line Height",
      customizations: "Customizations",
    },
    home: {
      h2: "Welcome",
      subtitle:
        "Astral Accessibility is a widget that provides reading and visual accessibility tools for web applications. Use the button in the bottom-right corner to open the panel and try each feature.",
      h3Features: "Features",
      featuresIntro:
        "Navigate to each feature page to see the tool in action on a dedicated page.",
      featureScreenReaderDesc: "reads out text when you click on elements",
      featureContrastDesc: "high-contrast and dark modes for better legibility",
      featureSaturationDesc: "adjust colour saturation or switch to greyscale",
      featureBiggerTextDesc: "scale text up to Medium, Large, or Extra Large",
      featureTextSpacingDesc: "increase letter spacing for readability",
      featureScreenMaskDesc:
        "dim the screen with a focus band that follows your cursor",
      featureLineHeightDesc: "increase vertical spacing between lines",
      h3About: "About this demo",
      aboutText:
        "Each page contains text so you can observe how the accessibility tools affect real content. Enable a setting, then navigate between pages to confirm the setting persists.",
    },
    screenReader: {
      h2: "Screen Reader",
      subtitle:
        "The screen reader reads out content when you click on any element. If an aria-label is present it uses that; otherwise it reads the element's visible text. Three speeds are available: normal, fast, and slow.",
      h3TryIt: "Try it",
      tryItP1:
        "Enable the Screen Reader from the widget, then click anywhere on this page. Headings, paragraphs, links, and labelled inputs should all be read aloud.",
      tryItP2:
        "Assistive technology benefits users with low vision, dyslexia, and attention difficulties. By hearing content read back, users can confirm what they are interacting with without needing to read every word on screen.",
      h3AriaDemo: "Aria label demo",
      ariaP:
        "The button below has an aria-label that differs from its visible text. The screen reader should speak the label, not the text.",
      buttonText: "Sign up",
      buttonAriaLabel: "Submit the registration form",
      h3PlainText: "Plain text demo",
      plainP1:
        "This paragraph has no special markup. Clicking it should read the raw text content aloud at the currently selected speed.",
      plainP2:
        "Accessibility is not a feature — it is a quality. Building inclusive interfaces ensures that every user, regardless of ability, can engage with digital content on equal footing.",
    },
    contrast: {
      h2: "Contrast",
      subtitle:
        "The contrast tool modifies background and foreground colours to increase the difference between text and its surroundings. Three modes are available: invert colours, high contrast, and dark high contrast.",
      h3WhyMatters: "Why contrast matters",
      whyP1:
        "Low contrast between text and background is one of the most common barriers for users with low vision or colour blindness. WCAG 2.1 requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.",
      whyP2:
        "High-contrast modes benefit users in bright environments too — sunlight reflecting off a screen can reduce effective contrast significantly.",
      h3Enable: "Enable and compare",
      enableP1:
        "Open the accessibility widget and cycle through the contrast options. Observe how the background and text colours change on this page and in the navigation bar above.",
      enableP2:
        "After switching modes, navigate to another feature page and back to confirm the contrast setting is preserved across navigation.",
    },
    saturation: {
      h2: "Saturation",
      subtitle:
        "The saturation tool adjusts how vivid the colours appear on screen. Three modes let you lower saturation, increase it, or remove colour entirely for a greyscale view.",
      h3WhoBenefits: "Who benefits",
      whoP1:
        "Users with colour vision deficiency may find reduced or altered saturation easier to distinguish. Greyscale mode removes colour as a carrier of meaning entirely, which is useful for testing whether a design is accessible without relying on colour alone.",
      whoP2:
        "Oversaturation can be useful for users with certain visual processing differences who perceive low-saturation displays as washed out.",
      h3ColoredDemo: "Coloured content demo",
      blueText: "This sentence is rendered in blue.",
      orangeText: "This sentence is rendered in orange-red.",
      greenText: "This sentence is rendered in green.",
      coloredP:
        "Cycle through the saturation settings from the widget and observe how the coloured sentences above change. Greyscale mode should render all three paragraphs in similar shades of grey.",
    },
    biggerText: {
      h2: "Bigger Text",
      subtitle:
        "The Bigger Text tool scales all text on the page. Three levels are available: Medium (1.2×), Large (1.5×), and Extra Large (1.8×).",
      h3HowWorks: "How it works",
      howP1:
        "Text scaling is applied by traversing the DOM and adjusting the computed font size of each text-bearing element. A MutationObserver watches for new nodes added during navigation so that dynamically rendered content is scaled too.",
      howP2:
        "Enable a text size level, then navigate to another page and back. The font should remain at the selected size without growing larger on each navigation.",
      h3SampleText: "Sample text at various sizes",
      sample12px: "This paragraph uses a 12px base font size.",
      sample16px: "This paragraph uses a 16px base font size.",
      sample20px: "This paragraph uses a 20px base font size.",
      h3Navigate: "Navigate and return",
      navigateP:
        "Set the text size to Large, navigate to the Screen Reader page, then return here. The paragraph sizes above should be exactly 1.5× their original values — not 1.5× compounded over multiple navigations.",
    },
    textSpacing: {
      h2: "Text Spacing",
      subtitle:
        "The Text Spacing tool increases the letter spacing between characters, making dense text easier to scan and read.",
      h3Benefits: "Benefits for readers",
      benefitsP1:
        "Wider letter spacing benefits users with dyslexia, who often report that tightly packed characters blur together. It also helps users reading in a second language, where individual character recognition plays a larger role in comprehension.",
      benefitsP2:
        "WCAG 2.1 Success Criterion 1.4.12 requires that no loss of content occurs when letter spacing is increased to at least 0.12× the font size. This tool goes beyond that baseline.",
      h3DenseDemo: "Dense text demo",
      denseIntro:
        "The following paragraph is intentionally compact. Enable Text Spacing from the widget and observe how the characters spread apart:",
      denseText:
        "Accessibility standards exist to ensure that the broadest possible audience can use digital interfaces effectively. When developers implement these standards consistently, the result is a product that works for everyone — not just the majority.",
    },
    screenMask: {
      h2: "Screen Mask",
      subtitle:
        "The Screen Mask dims the background and highlights a horizontal band that follows your cursor as you move it up and down the page.",
      h3WhoHelps: "Who it helps",
      whoP1:
        "Users with attention deficit disorders, visual tracking difficulties, or photosensitivity benefit from isolating a single line of focus. The mask reduces the cognitive load of filtering out surrounding content while reading.",
      whoP2:
        "It is also useful on information-dense pages — such as tables or code listings — where accidentally jumping to the wrong row is a common frustration.",
      h3TryHere: "Try it here",
      tryP1:
        "Enable the Screen Mask from the widget, then move your cursor slowly down this page. The focus band should track your vertical position, dimming everything above and below the highlighted area.",
      tryP2:
        "Move your cursor quickly — the band should follow smoothly without lag. Then navigate to another page and back to confirm the mask remains active.",
      tryP3:
        "The following lines are spaced generously to make the focus band easier to observe as it moves:",
      line1: "Line one — move your cursor here.",
      line2: "Line two — now move your cursor here.",
      line3: "Line three — and now here.",
    },
    lineHeight: {
      h2: "Line Height",
      subtitle:
        "The Line Height tool increases the vertical spacing between lines of text, making paragraphs easier to follow from one line to the next.",
      h3WhyMatters: "Why spacing matters",
      whyP1:
        "Insufficient line height forces the eye to work harder when moving from the end of one line to the beginning of the next. For users with low vision or cognitive differences, this extra effort accumulates across a long document and leads to faster fatigue.",
      whyP2:
        "WCAG 2.1 Success Criterion 1.4.12 specifies a minimum line height of 1.5× the font size. Many designs fall short of this baseline. This tool lets users override the page's default spacing to meet their own needs.",
      h3DenseDemo: "Dense paragraph demo",
      denseP:
        "This paragraph has a deliberately tight line height of 1.2. Enable Line Height from the accessibility widget and watch this paragraph open up. The increased spacing should make it noticeably easier to read through to the end of each line without losing your place.",
      h3NormalPara: "Normal paragraph",
      normalP:
        "This paragraph uses the default line height set by the stylesheet. Use it as a reference to compare how the tight paragraph above changes relative to unmodified content when you adjust the line height setting.",
    },
    customizations: {
      h2: "Customizations",
      subtitle:
        "Modify how the Astral widget is initialised on this page. Click Save to destroy the current widget and re-initialise it with your new settings.",
      h3General: "General",
      compactLabel: "Compact mode",
      compactHelp:
        "Reduce icons, font size, and padding for a smaller widget footprint.",
      h3Features: "Enabled features",
      h3Position: "Position",
      positionBottomRight: "Bottom right",
      positionBottomLeft: "Bottom left",
      positionTopRight: "Top right",
      positionTopLeft: "Top left",
      h3Colors: "Toggle button colors",
      toggleColorLabel: "Toggle background",
      toggleIconColorLabel: "Toggle icon",
      h3CustomStyles: "Custom styles",
      customStylesHelp:
        "Inline CSS overrides applied to the widget root. Any valid CSS property or custom variable is accepted (e.g. bottom: 140px, --modalWidth: 500px).",
      propertyPlaceholder: "property",
      valuePlaceholder: "value",
      addRow: "Add row",
      removeRow: "Remove",
      saveButton: "Save and refresh widget",
      savedAt: "Last applied at",
      h3Snippet: "Sample code",
      snippetHelp:
        "Drop this into your own page to initialise the widget with the settings above.",
      copy: "Copy",
      copied: "Copied",
      copyFailed: "Copy failed",
    },
  },

  fr: {
    nav: {
      home: "Accueil",
      screenReader: "Lecteur d'écran",
      contrast: "Contraste",
      saturation: "Saturation",
      biggerText: "Texte plus grand",
      textSpacing: "Espacement du texte",
      screenMask: "Masque d'écran",
      lineHeight: "Hauteur de ligne",
      customizations: "Personnalisation",
    },
    home: {
      h2: "Bienvenue",
      subtitle:
        "Astral Accessibility est un widget qui fournit des outils d'accessibilité de lecture et visuels pour les applications web. Utilisez le bouton en bas à droite pour ouvrir le panneau et essayer chaque fonctionnalité.",
      h3Features: "Fonctionnalités",
      featuresIntro:
        "Accédez à chaque page de fonctionnalité pour voir l'outil en action sur une page dédiée.",
      featureScreenReaderDesc:
        "lit le texte lorsque vous cliquez sur des éléments",
      featureContrastDesc:
        "modes à contraste élevé et sombre pour une meilleure lisibilité",
      featureSaturationDesc:
        "ajuster la saturation des couleurs ou passer en niveaux de gris",
      featureBiggerTextDesc: "agrandir le texte en Moyen, Grand ou Très grand",
      featureTextSpacingDesc:
        "augmenter l'espacement des lettres pour une meilleure lisibilité",
      featureScreenMaskDesc:
        "assombrir l'écran avec une bande de focus qui suit votre curseur",
      featureLineHeightDesc: "augmenter l'espacement vertical entre les lignes",
      h3About: "À propos de cette démo",
      aboutText:
        "Chaque page contient du texte pour vous permettre d'observer comment les outils d'accessibilité affectent le contenu réel. Activez un paramètre, puis naviguez entre les pages pour confirmer que le paramètre persiste.",
    },
    screenReader: {
      h2: "Lecteur d'écran",
      subtitle:
        "Le lecteur d'écran lit le contenu lorsque vous cliquez sur un élément. Si un aria-label est présent, il l'utilise ; sinon, il lit le texte visible de l'élément. Trois vitesses sont disponibles : normale, rapide et lente.",
      h3TryIt: "Essayez",
      tryItP1:
        "Activez le lecteur d'écran depuis le widget, puis cliquez n'importe où sur cette page. Les titres, paragraphes, liens et entrées étiquetées devraient tous être lus à voix haute.",
      tryItP2:
        "La technologie d'assistance bénéficie aux utilisateurs ayant une basse vision, une dyslexie et des difficultés d'attention. En entendant le contenu lu, les utilisateurs peuvent confirmer ce avec quoi ils interagissent sans avoir besoin de lire chaque mot à l'écran.",
      h3AriaDemo: "Démo d'étiquette aria",
      ariaP:
        "Le bouton ci-dessous a un aria-label différent de son texte visible. Le lecteur d'écran devrait lire l'étiquette, pas le texte.",
      buttonText: "S'inscrire",
      buttonAriaLabel: "Soumettre le formulaire d'inscription",
      h3PlainText: "Démo de texte brut",
      plainP1:
        "Ce paragraphe n'a pas de balisage spécial. Cliquer dessus devrait lire le texte brut à voix haute à la vitesse actuellement sélectionnée.",
      plainP2:
        "L'accessibilité n'est pas une fonctionnalité — c'est une qualité. Construire des interfaces inclusives garantit que chaque utilisateur, quelle que soit sa capacité, peut interagir avec le contenu numérique sur un pied d'égalité.",
    },
    contrast: {
      h2: "Contraste",
      subtitle:
        "L'outil de contraste modifie les couleurs d'arrière-plan et de premier plan pour augmenter la différence entre le texte et son environnement. Trois modes sont disponibles : inverser les couleurs, contraste élevé et contraste élevé sombre.",
      h3WhyMatters: "Pourquoi le contraste est important",
      whyP1:
        "Un faible contraste entre le texte et l'arrière-plan est l'un des obstacles les plus courants pour les utilisateurs ayant une basse vision ou un daltonisme. WCAG 2.1 exige un rapport de contraste d'au moins 4,5:1 pour le texte normal et 3:1 pour le grand texte.",
      whyP2:
        "Les modes à contraste élevé bénéficient également aux utilisateurs dans des environnements lumineux — le soleil reflété sur un écran peut réduire considérablement le contraste effectif.",
      h3Enable: "Activer et comparer",
      enableP1:
        "Ouvrez le widget d'accessibilité et parcourez les options de contraste. Observez comment les couleurs d'arrière-plan et de texte changent sur cette page et dans la barre de navigation ci-dessus.",
      enableP2:
        "Après avoir changé de mode, naviguez vers une autre page de fonctionnalité et revenez pour confirmer que le paramètre de contraste est préservé lors de la navigation.",
    },
    saturation: {
      h2: "Saturation",
      subtitle:
        "L'outil de saturation ajuste la vivacité des couleurs à l'écran. Trois modes vous permettent de diminuer la saturation, de l'augmenter ou de supprimer entièrement la couleur pour une vue en niveaux de gris.",
      h3WhoBenefits: "Qui en bénéficie",
      whoP1:
        "Les utilisateurs avec une déficience de la vision des couleurs peuvent trouver une saturation réduite ou altérée plus facile à distinguer. Le mode niveaux de gris supprime complètement la couleur comme vecteur de sens, ce qui est utile pour tester si un design est accessible sans se fier uniquement à la couleur.",
      whoP2:
        "La sursaturation peut être utile pour les utilisateurs ayant certaines différences de traitement visuel qui perçoivent les écrans à faible saturation comme délavés.",
      h3ColoredDemo: "Démo de contenu coloré",
      blueText: "Cette phrase est rendue en bleu.",
      orangeText: "Cette phrase est rendue en orange-rouge.",
      greenText: "Cette phrase est rendue en vert.",
      coloredP:
        "Parcourez les paramètres de saturation depuis le widget et observez comment les phrases colorées ci-dessus changent. Le mode niveaux de gris devrait rendre les trois paragraphes dans des teintes de gris similaires.",
    },
    biggerText: {
      h2: "Texte plus grand",
      subtitle:
        "L'outil Texte plus grand met à l'échelle tout le texte sur la page. Trois niveaux sont disponibles : Moyen (1,2×), Grand (1,5×) et Très grand (1,8×).",
      h3HowWorks: "Comment ça fonctionne",
      howP1:
        "La mise à l'échelle du texte est appliquée en parcourant le DOM et en ajustant la taille de police calculée de chaque élément portant du texte. Un MutationObserver surveille les nouveaux nœuds ajoutés lors de la navigation pour que le contenu rendu dynamiquement soit également mis à l'échelle.",
      howP2:
        "Activez un niveau de taille de texte, puis naviguez vers une autre page et revenez. La police devrait rester à la taille sélectionnée sans grossir à chaque navigation.",
      h3SampleText: "Exemples de texte à différentes tailles",
      sample12px: "Ce paragraphe utilise une taille de police de base de 12px.",
      sample16px: "Ce paragraphe utilise une taille de police de base de 16px.",
      sample20px: "Ce paragraphe utilise une taille de police de base de 20px.",
      h3Navigate: "Naviguer et revenir",
      navigateP:
        "Réglez la taille du texte sur Grand, naviguez vers la page Lecteur d'écran, puis revenez ici. Les tailles de paragraphe ci-dessus devraient être exactement 1,5× leurs valeurs d'origine — pas 1,5× composé sur plusieurs navigations.",
    },
    textSpacing: {
      h2: "Espacement du texte",
      subtitle:
        "L'outil Espacement du texte augmente l'espacement des lettres entre les caractères, rendant le texte dense plus facile à parcourir et à lire.",
      h3Benefits: "Avantages pour les lecteurs",
      benefitsP1:
        "Un espacement des lettres plus large bénéficie aux utilisateurs dyslexiques, qui signalent souvent que les caractères serrés se confondent. Il aide également les utilisateurs lisant dans une deuxième langue, où la reconnaissance individuelle des caractères joue un rôle plus important dans la compréhension.",
      benefitsP2:
        "Le critère de succès WCAG 2.1 1.4.12 exige qu'aucune perte de contenu ne se produise lorsque l'espacement des lettres est augmenté à au moins 0,12× la taille de police. Cet outil va au-delà de cette base.",
      h3DenseDemo: "Démo de texte dense",
      denseIntro:
        "Le paragraphe suivant est intentionnellement compact. Activez l'Espacement du texte depuis le widget et observez comment les caractères s'écartent :",
      denseText:
        "Les normes d'accessibilité existent pour garantir que le plus large public possible peut utiliser les interfaces numériques efficacement. Lorsque les développeurs appliquent ces normes de manière cohérente, le résultat est un produit qui fonctionne pour tous — pas seulement pour la majorité.",
    },
    screenMask: {
      h2: "Masque d'écran",
      subtitle:
        "Le Masque d'écran assombrit l'arrière-plan et met en évidence une bande horizontale qui suit votre curseur lorsque vous le déplacez de haut en bas sur la page.",
      h3WhoHelps: "À qui ça aide",
      whoP1:
        "Les utilisateurs souffrant de troubles déficitaires de l'attention, de difficultés de suivi visuel ou de photosensibilité bénéficient de l'isolation d'une seule ligne de focus. Le masque réduit la charge cognitive liée au filtrage du contenu environnant lors de la lecture.",
      whoP2:
        "Il est également utile sur les pages à forte densité d'informations — comme les tableaux ou les listes de code — où sauter accidentellement à la mauvaise ligne est une frustration courante.",
      h3TryHere: "Essayez ici",
      tryP1:
        "Activez le Masque d'écran depuis le widget, puis déplacez lentement votre curseur vers le bas de cette page. La bande de focus devrait suivre votre position verticale, assombrissant tout ce qui est au-dessus et en dessous de la zone mise en évidence.",
      tryP2:
        "Déplacez rapidement votre curseur — la bande devrait suivre en douceur sans décalage. Naviguez ensuite vers une autre page et revenez pour confirmer que le masque reste actif.",
      tryP3:
        "Les lignes suivantes sont espacées généreusement pour faciliter l'observation de la bande de focus lors de ses déplacements :",
      line1: "Ligne un — déplacez votre curseur ici.",
      line2: "Ligne deux — déplacez maintenant votre curseur ici.",
      line3: "Ligne trois — et maintenant ici.",
    },
    lineHeight: {
      h2: "Hauteur de ligne",
      subtitle:
        "L'outil Hauteur de ligne augmente l'espacement vertical entre les lignes de texte, rendant les paragraphes plus faciles à suivre d'une ligne à l'autre.",
      h3WhyMatters: "Pourquoi l'espacement est important",
      whyP1:
        "Une hauteur de ligne insuffisante force l'œil à travailler davantage lors du passage de la fin d'une ligne au début de la suivante. Pour les utilisateurs ayant une basse vision ou des différences cognitives, cet effort supplémentaire s'accumule sur un long document et conduit à une fatigue plus rapide.",
      whyP2:
        "Le critère de succès WCAG 2.1 1.4.12 spécifie une hauteur de ligne minimale de 1,5× la taille de police. De nombreux designs sont en deçà de cette base. Cet outil permet aux utilisateurs de remplacer l'espacement par défaut de la page selon leurs propres besoins.",
      h3DenseDemo: "Démo de paragraphe dense",
      denseP:
        "Ce paragraphe a une hauteur de ligne délibérément serrée de 1,2. Activez la Hauteur de ligne depuis le widget d'accessibilité et observez ce paragraphe s'ouvrir. L'espacement accru devrait rendre notablement plus facile la lecture jusqu'à la fin de chaque ligne sans perdre sa place.",
      h3NormalPara: "Paragraphe normal",
      normalP:
        "Ce paragraphe utilise la hauteur de ligne par défaut définie par la feuille de style. Utilisez-le comme référence pour comparer comment le paragraphe serré ci-dessus change par rapport au contenu non modifié lorsque vous ajustez le paramètre de hauteur de ligne.",
    },
    customizations: {
      h2: "Personnalisation",
      subtitle:
        "Modifiez la façon dont le widget Astral est initialisé sur cette page. Cliquez sur Enregistrer pour détruire le widget actuel et le réinitialiser avec vos nouveaux paramètres.",
      h3General: "Général",
      compactLabel: "Mode compact",
      compactHelp:
        "Réduit les icônes, la taille de police et l'espacement pour un widget plus compact.",
      h3Features: "Fonctionnalités activées",
      h3Position: "Position",
      positionBottomRight: "Bas droite",
      positionBottomLeft: "Bas gauche",
      positionTopRight: "Haut droite",
      positionTopLeft: "Haut gauche",
      h3Colors: "Couleurs du bouton",
      toggleColorLabel: "Arrière-plan",
      toggleIconColorLabel: "Icône",
      h3CustomStyles: "Styles personnalisés",
      customStylesHelp:
        "Remplacements CSS en ligne appliqués à la racine du widget. Toute propriété CSS valide ou variable personnalisée est acceptée (par ex. bottom: 140px, --modalWidth: 500px).",
      propertyPlaceholder: "propriété",
      valuePlaceholder: "valeur",
      addRow: "Ajouter une ligne",
      removeRow: "Supprimer",
      saveButton: "Enregistrer et actualiser le widget",
      savedAt: "Dernière application",
      h3Snippet: "Code d'exemple",
      snippetHelp:
        "Copiez ceci dans votre propre page pour initialiser le widget avec les paramètres ci-dessus.",
      copy: "Copier",
      copied: "Copié",
      copyFailed: "Échec de la copie",
    },
  },

  "zh-Hant": {
    nav: {
      home: "首頁",
      screenReader: "螢幕閱讀器",
      contrast: "對比度",
      saturation: "飽和度",
      biggerText: "放大文字",
      textSpacing: "文字間距",
      screenMask: "螢幕遮罩",
      lineHeight: "行高",
      customizations: "自訂",
    },
    home: {
      h2: "歡迎",
      subtitle:
        "Astral Accessibility 是一個為網頁應用程式提供閱讀和視覺無障礙工具的小工具。使用右下角的按鈕開啟面板並嘗試每項功能。",
      h3Features: "功能",
      featuresIntro: "前往每個功能頁面，在專屬頁面上查看工具的實際效果。",
      featureScreenReaderDesc: "當您點擊元素時讀出文字",
      featureContrastDesc: "高對比度和深色模式，提高可讀性",
      featureSaturationDesc: "調整色彩飽和度或切換至灰階",
      featureBiggerTextDesc: "將文字放大至中等、大型或超大",
      featureTextSpacingDesc: "增加字母間距以提高可讀性",
      featureScreenMaskDesc: "以跟隨游標的焦點帶使螢幕變暗",
      featureLineHeightDesc: "增加行間的垂直間距",
      h3About: "關於此示範",
      aboutText:
        "每個頁面都包含文字，讓您觀察無障礙工具如何影響真實內容。啟用一個設定，然後在頁面之間導航，確認設定持續有效。",
    },
    screenReader: {
      h2: "螢幕閱讀器",
      subtitle:
        "當您點擊任何元素時，螢幕閱讀器會讀出內容。若存在 aria-label，則使用它；否則讀取元素的可見文字。提供三種速度：正常、快速和慢速。",
      h3TryIt: "試試看",
      tryItP1:
        "從小工具啟用螢幕閱讀器，然後點擊此頁面上的任何位置。標題、段落、連結和已標記的輸入框都應被大聲朗讀。",
      tryItP2:
        "輔助技術有助於視力低下、閱讀障礙和注意力困難的使用者。透過聆聽內容被讀出，使用者可以確認他們正在互動的內容，而不需要閱讀螢幕上的每個字。",
      h3AriaDemo: "aria 標籤示範",
      ariaP:
        "以下按鈕的 aria-label 與其可見文字不同。螢幕閱讀器應朗讀標籤，而非文字。",
      buttonText: "註冊",
      buttonAriaLabel: "提交註冊表單",
      h3PlainText: "純文字示範",
      plainP1:
        "此段落沒有特殊標記。點擊它應以當前選擇的速度大聲讀出原始文字內容。",
      plainP2:
        "無障礙不是一項功能——它是一種品質。建立包容性介面確保每位使用者，無論能力如何，都能在平等的基礎上與數位內容互動。",
    },
    contrast: {
      h2: "對比度",
      subtitle:
        "對比度工具修改背景和前景顏色，以增加文字與周圍環境之間的差異。提供三種模式：反轉顏色、高對比度和深色高對比度。",
      h3WhyMatters: "為什麼對比度很重要",
      whyP1:
        "文字和背景之間的低對比度是視力低下或色盲使用者最常見的障礙之一。WCAG 2.1 要求普通文字的對比度至少為 4.5:1，大型文字為 3:1。",
      whyP2:
        "高對比度模式也有助於在明亮環境中的使用者——陽光反射在螢幕上可以顯著降低有效對比度。",
      h3Enable: "啟用並比較",
      enableP1:
        "開啟無障礙小工具並循環瀏覽對比度選項。觀察此頁面和上方導航欄中背景和文字顏色的變化。",
      enableP2:
        "切換模式後，導航到另一個功能頁面並返回，確認對比度設定在導航過程中得以保留。",
    },
    saturation: {
      h2: "飽和度",
      subtitle:
        "飽和度工具調整螢幕上顯示的顏色鮮豔程度。三種模式讓您降低飽和度、增加飽和度，或完全移除顏色以呈現灰階視圖。",
      h3WhoBenefits: "誰能受益",
      whoP1:
        "色覺障礙的使用者可能發現降低或改變的飽和度更容易辨別。灰階模式完全移除顏色作為意義的載體，這對於測試設計是否在不依賴顏色的情況下也能無障礙很有用。",
      whoP2:
        "對於某些視覺處理差異的使用者，過度飽和可能很有用，他們認為低飽和度的顯示器看起來很黯淡。",
      h3ColoredDemo: "彩色內容示範",
      blueText: "這句話以藍色呈現。",
      orangeText: "這句話以橙紅色呈現。",
      greenText: "這句話以綠色呈現。",
      coloredP:
        "從小工具循環瀏覽飽和度設定，觀察上方彩色句子的變化。灰階模式應將三個段落都以相似的灰色調呈現。",
    },
    biggerText: {
      h2: "放大文字",
      subtitle:
        "放大文字工具縮放頁面上的所有文字。提供三個級別：中等（1.2×）、大（1.5×）和超大（1.8×）。",
      h3HowWorks: "運作方式",
      howP1:
        "文字縮放透過遍歷 DOM 並調整每個含文字元素的計算字體大小來應用。MutationObserver 監視導航過程中新增的節點，以便動態渲染的內容也能被縮放。",
      howP2:
        "啟用文字大小級別，然後導航到另一個頁面並返回。字體應保持在選定的大小，而不會在每次導航時增大。",
      h3SampleText: "各種大小的文字示例",
      sample12px: "此段落使用 12px 的基本字體大小。",
      sample16px: "此段落使用 16px 的基本字體大小。",
      sample20px: "此段落使用 20px 的基本字體大小。",
      h3Navigate: "導航並返回",
      navigateP:
        "將文字大小設為大，導航到螢幕閱讀器頁面，然後返回此處。上方的段落大小應恰好是其原始值的 1.5×——而不是在多次導航中複合的 1.5×。",
    },
    textSpacing: {
      h2: "文字間距",
      subtitle:
        "文字間距工具增加字符之間的字母間距，使密集文字更容易掃描和閱讀。",
      h3Benefits: "對讀者的好處",
      benefitsP1:
        "更寬的字母間距有助於閱讀障礙的使用者，他們通常反映緊密排列的字符會模糊在一起。它也有助於使用第二語言閱讀的使用者，其中個別字符識別在理解中扮演更重要的角色。",
      benefitsP2:
        "WCAG 2.1 成功標準 1.4.12 要求當字母間距增加到至少 0.12× 字體大小時，不得有內容損失。此工具超越了該基準。",
      h3DenseDemo: "密集文字示範",
      denseIntro:
        "以下段落是刻意緊湊的。從小工具啟用文字間距，觀察字符如何散開：",
      denseText:
        "無障礙標準的存在是為了確保最廣泛的受眾能夠有效使用數位介面。當開發人員一致地實施這些標準時，結果是一個適用於所有人的產品——而不僅僅是多數人。",
    },
    screenMask: {
      h2: "螢幕遮罩",
      subtitle:
        "螢幕遮罩使背景變暗，並突顯一個水平帶，當您在頁面上下移動游標時跟隨游標。",
      h3WhoHelps: "對誰有幫助",
      whoP1:
        "患有注意力缺陷障礙、視覺追蹤困難或光敏感的使用者可以從隔離單一焦點線中受益。遮罩減少了閱讀時過濾周圍內容的認知負擔。",
      whoP2:
        "它對資訊密集的頁面也很有用——例如表格或程式碼列表——其中意外跳到錯誤行是一種常見的困擾。",
      h3TryHere: "在這裡試試",
      tryP1:
        "從小工具啟用螢幕遮罩，然後緩慢地將游標向下移動此頁面。焦點帶應跟蹤您的垂直位置，使突顯區域上方和下方的所有內容變暗。",
      tryP2:
        "快速移動游標——帶應流暢跟隨而不滯後。然後導航到另一個頁面並返回，確認遮罩仍然有效。",
      tryP3: "以下行間距較大，以便在焦點帶移動時更容易觀察：",
      line1: "第一行——將游標移到這裡。",
      line2: "第二行——現在將游標移到這裡。",
      line3: "第三行——現在移到這裡。",
    },
    lineHeight: {
      h2: "行高",
      subtitle:
        "行高工具增加文字行之間的垂直間距，使段落更容易從一行跟到下一行。",
      h3WhyMatters: "為什麼間距很重要",
      whyP1:
        "不足的行高迫使眼睛在從一行末尾移到下一行開頭時更加努力。對於視力低下或有認知差異的使用者，這種額外的努力在長文件中累積，導致更快的疲勞。",
      whyP2:
        "WCAG 2.1 成功標準 1.4.12 指定最小行高為字體大小的 1.5×。許多設計未達到此基準。此工具讓使用者可以覆蓋頁面的預設間距以滿足自己的需求。",
      h3DenseDemo: "密集段落示範",
      denseP:
        "此段落的行高刻意緊湊，為 1.2。從無障礙小工具啟用行高，觀察此段落展開。增加的間距應使閱讀到每行末尾而不失去位置變得明顯更容易。",
      h3NormalPara: "正常段落",
      normalP:
        "此段落使用樣式表設定的預設行高。將其作為參考，比較當您調整行高設定時，上方緊湊段落相對於未修改內容的變化。",
    },
    customizations: {
      h2: "自訂",
      subtitle:
        "修改此頁面上 Astral 小工具的初始化方式。點擊「儲存」以銷毀目前的小工具並使用新設定重新初始化。",
      h3General: "一般",
      compactLabel: "緊湊模式",
      compactHelp: "縮小圖示、字體大小和間距，讓小工具佔用更少空間。",
      h3Features: "已啟用的功能",
      h3Position: "位置",
      positionBottomRight: "右下",
      positionBottomLeft: "左下",
      positionTopRight: "右上",
      positionTopLeft: "左上",
      h3Colors: "切換按鈕顏色",
      toggleColorLabel: "背景",
      toggleIconColorLabel: "圖示",
      h3CustomStyles: "自訂樣式",
      customStylesHelp:
        "套用至小工具根元素的行內 CSS 覆寫。接受任何有效的 CSS 屬性或自訂變數（例如 bottom: 140px、--modalWidth: 500px）。",
      propertyPlaceholder: "屬性",
      valuePlaceholder: "值",
      addRow: "新增一列",
      removeRow: "移除",
      saveButton: "儲存並重新整理小工具",
      savedAt: "上次套用時間",
      h3Snippet: "程式碼範例",
      snippetHelp: "將此程式碼複製到您自己的頁面，即可以上述設定初始化小工具。",
      copy: "複製",
      copied: "已複製",
      copyFailed: "複製失敗",
    },
  },
};
