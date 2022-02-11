export function Compare(obj1: any, obj2: any) {
    let storedObjs: any[] = [];

    function toString(obj: any) {
        return obj == undefined
            ? 'undefined'
            : typeof(obj) == 'object'
            ? 'object'
            : obj;
    }

    function compareInner(left: any, right: any) {
        if(((left == undefined) != (right == undefined))
            || (typeof(left) != typeof(right)))
        {
            return {
                left: toString(left)
                , right: toString(right)
            }
        }

        if(typeof(left) == 'object') {
            let leftFound = storedObjs.findIndex(x=>x===left)>0;
            let rightFound = storedObjs.findIndex(x=>x===right)>0;

            if(leftFound||rightFound) {
                return {
                    left  : leftFound  ? "recursive" : toString(left)
                    , right : rightFound ? "recursive" : toString(right)
                }
            }

            storedObjs.push(left);
            storedObjs.push(right);

            let objCmp: any = {}
            for(let key in left) {
                let innerResult = compareInner(left[key],right[key]);
                if(innerResult) objCmp[key] = innerResult;
            }
            if(Object.keys(objCmp).length==0) return undefined;
            return objCmp;
        }

        if(left != right) {
            return {left:left,right:right};
        }
        return undefined;
    }
    return compareInner(obj1,obj2) || {};
}