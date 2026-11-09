export class BaseModel<T> {
    
    protected checkFields(row?: Partial<T>): void {
      if (row) {
        for (const prop in this) {
          if (Object.prototype.hasOwnProperty.call(row, prop)) {
            this[prop] = (row as ThisType<T>)[prop as keyof ThisType<T>];
          }
        }
      }
    }  


  protected assignMatchedFields<S extends object>(sourceObj?: S, match?: any){// IMatchModel<T,S>) {
    if (sourceObj && match) {
      (Object.entries(match) as [ keyof this, keyof S][]).map(([key, value]) => {
        if (value in sourceObj) {
          (this as any)[key as any] = sourceObj[value];
        }
      })
    }
    return this;
  }

  toPlainObject() {
    return JSON.parse(JSON.stringify(this))
  }

}


export type IMatchModel<K,V>  = {
  [Property in keyof K]:  keyof V;
}

export interface IObjValueModel<K> {
  [key: string]: K;
}

export interface IArrayValueModel<K> {
  [key: number]: K;
}


//Singleton example
// class MyClass extends BaseModel {
//   private static instance: MyClass;

//   a ='nj';
//   c=3;

//   constructor(inputFields?: any) { 
//     super();
//     if (MyClass.instance) { return MyClass.instance}
//     super.checkFields(inputFields);
//     MyClass.instance = this;
//   }
// }


// const n =  new MyClass({a:1,b:2});
// const n2 =  new MyClass({a:5,b:8});
// console.log(n, n2, n=== n2);
