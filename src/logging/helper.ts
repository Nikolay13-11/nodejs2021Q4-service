
export function convert(o:any) {
    let result = '';
  const arrFromObject = Object.keys(o);
  if(arrFromObject.length === 0) {
      result = 'not pass;'
  } else {
    for(let i = 0; i < arrFromObject.length; i += 1){
        result += `${arrFromObject[i]}-${o[arrFromObject[i]]} `
      }
  }
    return result.trim()
  }