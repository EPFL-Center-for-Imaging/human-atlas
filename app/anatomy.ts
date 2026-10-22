export type SystemId = 'skeletal'|'muscular'|'arterial'|'venous'|'nervous'|'digestive'|'respiratory'|'urinary'|'reproductive'|'lymphatic'|'endocrine'|'integumentary'|'connective'|'sensory'|'cardiac';
export const SYSTEMS: {id:SystemId;name:string;color:string;description:string}[] = [
 {id:'skeletal',name:'Squelette',color:'#e2d9ba',description:'Les os forment la charpente du corps, protègent les organes et offrent des points d’attache aux muscles. Leur tissu interne stocke aussi des minéraux et produit les cellules sanguines.'},
 {id:'muscular',name:'Muscles',color:'#a85b50',description:'Les muscles squelettiques produisent le mouvement en tirant sur leurs attaches. Avec les tendons, ils mobilisent les articulations, stabilisent la posture et produisent de la chaleur.'},
 {id:'cardiac',name:'Cœur',color:'#b96760',description:'Le cœur est une pompe musculaire à quatre cavités. Ses valves dirigent le sang vers l’avant, dans les circuits pulmonaire et systémique.'},
 {id:'sensory',name:'Organes sensoriels',color:'#b0c8ce',description:'Ces structures participent aux sens particuliers, notamment la vue, l’ouïe et l’équilibre. Leurs tissus spécialisés détectent les stimuli et transmettent l’information avec le système nerveux.'},
 {id:'arterial',name:'Artères',color:'#c05245',description:'Le cœur propulse le sang dans la circulation. Les artères acheminent le sang depuis le cœur vers les tissus ou, dans la circulation pulmonaire, vers les poumons.'},
 {id:'venous',name:'Veines',color:'#527c9f',description:'Les veines ramènent le sang vers le cœur. Des réseaux superficiels et profonds collectent le sang des tissus ; les veines pulmonaires ramènent le sang oxygéné des poumons.'},
 {id:'nervous',name:'Nerveux',color:'#d8b565',description:'L’encéphale, la moelle épinière et les nerfs périphériques transmettent et traitent les signaux. Ils assurent la sensibilité, le mouvement, la coordination et la régulation automatique des fonctions corporelles.'},
 {id:'respiratory',name:'Respiratoire',color:'#b98991',description:'Les voies aériennes conduisent l’air jusqu’aux poumons, où l’oxygène et le dioxyde de carbone passent entre l’air et le sang. La respiration repose sur les variations de pression produites par les muscles respiratoires.'},
 {id:'digestive',name:'Digestif',color:'#b8916b',description:'Le tube digestif décompose les aliments, absorbe les nutriments et l’eau, puis fait progresser les déchets. Les organes annexes apportent la bile et les enzymes digestives.'},
 {id:'urinary',name:'Urinaire',color:'#b47961',description:'Les reins filtrent le sang et régulent l’équilibre des liquides, des électrolytes et de l’acidité. L’urine gagne la vessie par les uretères et sort par l’urètre.'},
 {id:'lymphatic',name:'Lymphatique',color:'#879f7c',description:'Les vaisseaux lymphatiques renvoient le liquide tissulaire en excès vers la circulation. Les ganglions lymphatiques et autres organes lymphoïdes participent à la surveillance et à la réponse immunitaires.'},
 {id:'endocrine',name:'Endocrinien',color:'#c5a09a',description:'Les organes endocriniens libèrent des hormones dans le sang pour coordonner des processus comme le métabolisme, la croissance, la réponse au stress et la reproduction.'},
 {id:'reproductive',name:'Reproducteur',color:'#bda098',description:'Les structures reproductrices masculines présentées ici participent à la production, à la maturation et au transport des spermatozoïdes, ainsi qu’à la production d’hormones sexuelles.'},
 {id:'integumentary',name:'Surface du corps',color:'#ba9b7d',description:'La surface du corps sert de repère anatomique externe. Le système tégumentaire forme une barrière protectrice et contribue à la sensibilité et à la régulation de la température.'},
 {id:'connective',name:'Tissu conjonctif',color:'#aec3bb',description:'Les cartilages, ligaments et autres tissus conjonctifs soutiennent, relient et séparent les structures. Ils stabilisent notamment les articulations et répartissent les charges mécaniques.'},
];
export interface Part {id:string;name:string;conceptId:string;system:SystemId;chunk:number;positions:number;normals:number;indices:number;vertexCount:number;indexCount:number;bounds:[number[],number[]]}
export interface Concept {id:string;name:string;elements:string[];en?:string}
export interface Atlas {version:string;sex?:'male';source?:string;scope?:string;parts:Part[];concepts:Concept[];chunks:{url:string;bytes:number;gzip?:string;gzipBytes?:number}[];triangles:number}
export type View = 'three-quarter'|'front'|'back'|'side';
export interface SceneState {inspectorOpen?:boolean;explode:number;visible:SystemId[];selected:string[];isolate:boolean;view:View;rotate:boolean;reset:number}
export const DEFAULT_VISIBLE:SystemId[] = ['cardiac','sensory','skeletal','muscular','arterial','venous','nervous','respiratory','digestive','urinary','lymphatic','endocrine','reproductive','connective'];
/** Keyed by FMA concept identifier, so explanations survive translation of the names. */
export const EXPLANATIONS:Record<string,string> = {
 'FMA7088':'Une pompe musculaire située dans la poitrine. Son côté droit envoie le sang vers les poumons ; son côté gauche envoie le sang dans la circulation générale.',
 'FMA7197':'Un grand organe situé sous le côté droit du diaphragme. Il traite les nutriments absorbés, produit la bile et synthétise de nombreuses protéines transportées par le sang.',
 'FMA50801':'L’organe central du système nerveux. Ses régions interconnectées soutiennent la perception, le mouvement, la mémoire, le langage et la régulation des fonctions corporelles.',
 'FMA7148':'Une cavité musculaire située entre l’œsophage et l’intestin grêle. Elle stocke les aliments et les mélange à l’acide et aux enzymes avant de les libérer dans le duodénum.',
 'FMA7196':'Un organe lymphoïde situé dans la partie supérieure gauche de l’abdomen. Il filtre le sang, élimine les globules rouges vieillissants et participe aux réponses immunitaires.',
 'FMA7198':'Un organe abdominal aux rôles digestif et endocrinien. Il fournit des enzymes à l’intestin grêle et libère des hormones, dont l’insuline et le glucagon.',
 'FMA15900':'Un réservoir musculaire du bassin qui stocke l’urine arrivant des reins par les uretères.',
 'FMA7394':'La principale voie aérienne reliant le larynx aux bronches. Ses anneaux cartilagineux maintiennent les voies aériennes ouvertes pendant la respiration.',
 'FMA13295':'Un large muscle séparant le thorax et l’abdomen. En se contractant, il augmente le volume thoracique et aide à faire entrer l’air dans les poumons.',
};
export function explanation(conceptId:string,system:SystemId){return EXPLANATIONS[conceptId] ?? SYSTEMS.find(s=>s.id===system)?.description ?? '';}
/** Overlays French names onto an atlas loaded from atlas.json. Part names follow their concept, keeping the source's capitalization. */
export function localizeAtlas(atlas:Atlas,names:Record<string,string>):Atlas{
 const english=new Map(atlas.concepts.map(c=>[c.id,c.name]));
 const concepts=atlas.concepts.map(c=>names[c.id]?{...c,en:c.name,name:names[c.id]}:c);
 const parts=atlas.parts.map(p=>{const fr=names[p.conceptId],source=english.get(p.conceptId);if(!fr||source?.toLowerCase()!==p.name.toLowerCase())return p;return {...p,name:fr.charAt(0).toUpperCase()+fr.slice(1)};});
 return {...atlas,concepts,parts};
}
