export function getFromStorage(key){
    if (!key) {
        return null
    }

    try {
        const valuestr= localStorage.getItem(key);
        if (valuestr) {
            return JSON.parse(valuestr)
        }
        return null
    } catch (err) {
        return null
    }    
}

export function setInStorage(key,obj){
        if (!key) {
            console.error('Error: key is  missing ');
        }
         try {
             localStorage.setItem(key, JSON.stringify(obj));
         }
         catch (err) {
        Console.error(err);
    }
}