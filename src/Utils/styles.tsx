import { TypeDeclaration, TypeDeclarations} from 'Utils/types'; 

export const DeclarationBlock = (str:string) =>
  [
    '{',
    str
      .split('\n')
      .map((line) => (line.length === 0 ? '' : `  ${line}`))
      .join('\n'),
    '}',
  ].join('\n');


const myStyles: Array<any> = [];

export const Declaration = ( {property, value}: TypeDeclaration ) => `${property}: ${value};`;

export const setDeclarations = ( {property, value}: TypeDeclaration ) => `${property}: ${value};`;

// const Stylesheet = (statements) => myStyles.concat(statements.map(Ruleset)).join('\n\n');

// Use to css .selector { property: value }
/* export const Ruleset = ({ selector, declarations }: {selector: string, declarations: any}) =>
  `${selector} ${block(
    Object.keys(declarations)
      .map((property) => Declaration({ property, value: declarations[property] }))
      .join('\n'),
  )}`; */


export const ruleset = (selector: string, declarations: TypeDeclarations) => ({
  selector,
  declarations,
});

