export type SystemId = 'skeletal'|'muscular'|'arterial'|'venous'|'nervous'|'digestive'|'respiratory'|'urinary'|'reproductive'|'lymphatic'|'endocrine'|'integumentary'|'connective'|'sensory'|'cardiac';
export const SYSTEMS: {id:SystemId;name:string;color:string;description:string}[] = [
 {id:'skeletal',name:'Squelette',color:'#e2d9ba',description:'Les os forment la charpente du corps : ils le soutiennent, protègent les organes et servent de points d’ancrage aux muscles. Ils stockent aussi des minéraux, et la moelle qu’ils renferment fabrique les cellules du sang.'},
 {id:'muscular',name:'Muscles',color:'#a85b50',description:'En se contractant, les muscles tirent sur les os auxquels ils sont fixés par les tendons. Ils permettent ainsi de bouger les articulations, maintiennent la posture et produisent de la chaleur.'},
 {id:'cardiac',name:'Cœur',color:'#b96760',description:'Le cœur est une pompe musculaire composée de quatre cavités. Ses valves font circuler le sang dans un seul sens : vers les poumons d’une part, vers le reste du corps d’autre part.'},
 {id:'sensory',name:'Organes sensoriels',color:'#b0c8ce',description:'Ces organes nous permettent notamment de voir, d’entendre et de garder l’équilibre. Leurs tissus spécialisés captent les stimulations venues de l’extérieur et transmettent l’information au système nerveux.'},
 {id:'arterial',name:'Artères',color:'#c05245',description:'Propulsé par le cœur, le sang circule dans les artères, qui l’acheminent vers les organes et les tissus. Les artères pulmonaires, elles, le conduisent aux poumons pour qu’il s’y recharge en oxygène.'},
 {id:'venous',name:'Veines',color:'#527c9f',description:'Les veines ramènent le sang vers le cœur. Certaines circulent juste sous la peau, d’autres en profondeur. Les veines pulmonaires, elles, rapportent au cœur le sang qui vient de se charger en oxygène dans les poumons.'},
 {id:'nervous',name:'Sys. Nerveux',color:'#d8b565',description:'Le cerveau, la moelle épinière et les nerfs transmettent et traitent l’information. Ils nous permettent de ressentir, de bouger et de coordonner nos gestes, et règlent, sans que nous y pensions, de nombreuses fonctions du corps.'},
 {id:'respiratory',name:'Respiration',color:'#b98991',description:'Les voies respiratoires conduisent l’air jusqu’aux poumons, où le sang se charge en oxygène et se débarrasse du dioxyde de carbone. Pour inspirer et expirer, les muscles respiratoires font varier la pression dans la poitrine.'},
 {id:'digestive',name:'Digestion',color:'#b8916b',description:'Le tube digestif décompose les aliments, absorbe les nutriments et l’eau, puis évacue les déchets. Des organes annexes, comme le foie et le pancréas, y déversent la bile et des enzymes qui facilitent la digestion.'},
 {id:'urinary',name:'Sys. Urinaire',color:'#b47961',description:'Les reins filtrent le sang et maintiennent l’équilibre de l’organisme en eau, en sels minéraux et en acidité. L’urine qu’ils produisent descend jusqu’à la vessie par les uretères, puis est évacuée par l’urètre.'},
 {id:'lymphatic',name:'Sys. Lymphatique',color:'#879f7c',description:'Les vaisseaux lymphatiques recueillent le liquide en excès dans les tissus et le renvoient dans la circulation sanguine. Les ganglions et les autres organes lymphoïdes participent à la défense de l’organisme contre les infections.'},
 {id:'endocrine',name:'Sys. Endocrinien',color:'#c5a09a',description:'Les glandes endocrines libèrent dans le sang des hormones, véritables messagers chimiques qui coordonnent le métabolisme, la croissance, la réaction au stress ou encore la reproduction.'},
 {id:'reproductive',name:'Reproduction',color:'#bda098',description:'Les organes reproducteurs masculins représentés ici produisent les spermatozoïdes, assurent leur maturation et leur transport, et fabriquent les hormones sexuelles.'},
 {id:'integumentary',name:'Surface du corps',color:'#ba9b7d',description:'La surface du corps sert de repère pour situer les structures internes. La peau forme une barrière protectrice ; elle participe aussi au toucher et à la régulation de la température.'},
 {id:'connective',name:'Tissu conjonctif',color:'#aec3bb',description:'Les cartilages, les ligaments et les autres tissus conjonctifs soutiennent, relient et séparent les différentes structures du corps. Ils stabilisent notamment les articulations et aident à répartir les efforts.'},
];
export interface Part {id:string;name:string;conceptId:string;system:SystemId;chunk:number;positions:number;normals:number;indices:number;vertexCount:number;indexCount:number;bounds:[number[],number[]]}
export interface Concept {id:string;name:string;elements:string[];en?:string}
export interface Atlas {version:string;sex?:'male';source?:string;scope?:string;parts:Part[];concepts:Concept[];chunks:{url:string;bytes:number;gzip?:string;gzipBytes?:number}[];triangles:number}
export type View = 'three-quarter'|'front'|'back'|'side';
export interface SceneState {inspectorOpen?:boolean;explode:number;visible:SystemId[];selected:string[];isolate:boolean;view:View;rotate:boolean;reset:number}
export const DEFAULT_VISIBLE:SystemId[] = ['cardiac','sensory','skeletal','muscular','arterial','venous','nervous','respiratory','digestive','urinary','lymphatic','endocrine','reproductive','connective'];
/** Keyed by FMA concept identifier, so explanations survive translation of the names. */
export const EXPLANATIONS:Record<string,string> = {
 'FMA7088':'Une pompe musculaire logée dans la poitrine. Sa moitié droite envoie le sang vers les poumons, sa moitié gauche le propulse dans tout le reste du corps.',
 'FMA7197':'Un organe volumineux situé en haut à droite de l’abdomen, juste sous le diaphragme. Il transforme les nutriments issus de la digestion, produit la bile et fabrique de nombreuses protéines présentes dans le sang.',
 'FMA50801':'Le centre de commande du système nerveux. Ses différentes régions, étroitement reliées entre elles, nous permettent de percevoir, de bouger, de mémoriser et de parler, et règlent de nombreuses fonctions du corps.',
 'FMA7148':'Une poche musculaire située entre l’œsophage et l’intestin grêle. Les aliments y sont stockés et brassés avec des sucs acides et des enzymes, avant de passer peu à peu dans le duodénum, la première partie de l’intestin grêle.',
 'FMA7196':'Un organe situé en haut à gauche de l’abdomen, qui filtre le sang, élimine les globules rouges usés et participe aux défenses immunitaires.',
 'FMA7198':'Un organe de l’abdomen au double rôle, digestif et hormonal. Il déverse des enzymes dans l’intestin grêle et libère dans le sang des hormones comme l’insuline et le glucagon, qui régulent le taux de sucre.',
 'FMA15900':'Un réservoir musculaire situé dans le bassin. Il recueille l’urine qui arrive des reins par les uretères et la garde jusqu’au moment d’uriner.',
 'FMA7394':'Le principal conduit d’air, qui relie le larynx aux bronches. Des anneaux de cartilage le maintiennent ouvert pendant la respiration.',
 'FMA13295':'Un large muscle en forme de dôme qui sépare la poitrine de l’abdomen. En se contractant, il s’abaisse, agrandit la cage thoracique et fait entrer l’air dans les poumons.',
};
export function explanation(conceptId:string,system:SystemId){return EXPLANATIONS[conceptId] ?? SYSTEMS.find(s=>s.id===system)?.description ?? '';}
/** Overlays French names onto an atlas loaded from atlas.json. Part names follow their concept, keeping the source's capitalization. */
export function localizeAtlas(atlas:Atlas,names:Record<string,string>):Atlas{
 const english=new Map(atlas.concepts.map(c=>[c.id,c.name]));
 const concepts=atlas.concepts.map(c=>names[c.id]?{...c,en:c.name,name:names[c.id]}:c);
 const parts=atlas.parts.map(p=>{const fr=names[p.conceptId],source=english.get(p.conceptId);if(!fr||source?.toLowerCase()!==p.name.toLowerCase())return p;return {...p,name:fr.charAt(0).toUpperCase()+fr.slice(1)};});
 return {...atlas,concepts,parts};
}
