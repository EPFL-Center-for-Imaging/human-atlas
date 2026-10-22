import type {Atlas,Concept} from './anatomy';
type Tool={name:string;description:string;inputSchema:object;annotations:{readOnlyHint:boolean};execute:(input:unknown)=>unknown};
/** Accent-insensitive key used for matching: 'Cœur' and 'coeur' both become 'coeur'. */
export function searchKey(text:string){return text.normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/œ/g,'oe').replace(/æ/g,'ae').toLowerCase().trim();}
/** Matches French names, English aliases and source identifiers, so 'fémur', 'femur' and an FMA identifier all find the same structure. */
export function matchConcepts(concepts:Concept[],query:string){const term=searchKey(query);return concepts.filter(c=>searchKey(c.name).includes(term)||(c.en!==undefined&&searchKey(c.en).includes(term))||c.id.toLowerCase().includes(term));}
function record(input:unknown):Record<string,unknown>{if(!input||typeof input!=='object'||Array.isArray(input))throw new Error('Expected an object.');return input as Record<string,unknown>;}
export function atlasTools(atlas:Atlas,inspect:(concept:Concept)=>void):Tool[]{return [
 {name:'find_anatomy',description:'Trouve des structures anatomiques par nom, français ou latin, ou par identifiant source de cet atlas.',inputSchema:{type:'object',properties:{query:{type:'string',minLength:1}},required:['query'],additionalProperties:false},annotations:{readOnlyHint:true},execute(input){const data=record(input);if(typeof data.query!=='string'||!data.query.trim())throw new Error('Une requête non vide est requise.');return matchConcepts(atlas.concepts,data.query).slice(0,30).map(c=>({id:c.id,name:c.name,pieces:c.elements.length}));}},
 {name:'inspect_anatomical_structure',description:'Sélectionne une structure de l’atlas dans l’anatomie 3D et ouvre son panneau de détails.',inputSchema:{type:'object',properties:{id:{type:'string'}},required:['id'],additionalProperties:false},annotations:{readOnlyHint:false},execute(input){const data=record(input);if(typeof data.id!=='string')throw new Error('Un identifiant d’atlas est requis.');const concept=atlas.concepts.find(c=>c.id===data.id);if(!concept)throw new Error('Cette structure n’est pas présente dans cet atlas.');inspect(concept);return {id:concept.id,name:concept.name,selectedPieces:concept.elements.length};}}
 ];}
export function registerAtlasTools(atlas:Atlas,inspect:(concept:Concept)=>void){
 const context=(document as Document&{modelContext?:{registerTool:(tool:Tool,options:{signal:AbortSignal})=>void|Promise<void>}}).modelContext;
 if(!context?.registerTool)return;const lifecycle=new AbortController();
 for(const tool of atlasTools(atlas,inspect)){try{void Promise.resolve(context.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{/* Optional browser capability; the visible UI remains available. */}}
 return()=>lifecycle.abort();
}
