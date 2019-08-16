export const dispatcher = (type, payload, string) => ({ type,payload,meta:{tag:string} })
/**
 * it is the kind of clousure when invoked it, it will create the inner viriable
 * and return a function referen to assign fnc ex. delay = makeDelay()
 * then we can delay(somefunction)
 */
export const makeDelay = () => { 
   let timer = null
   return (callback) => {
       clearTimeout(timer);
       timer = setTimeout(callback, 800);
   }
};


export const trottle = () => { //single call if the same value stay true
   let inerState;
   return state => { 
       // true many time
       if (state !== inerState) {
           inerState = state;
           return false
       }
       return true
   }
}

export const rawDataStore = () => {
   let data = {}
   return model => {
       if(model) data = { ...data, ...model } ;
       return data;
   }
}