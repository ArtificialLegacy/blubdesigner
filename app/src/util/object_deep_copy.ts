type CloneableObject = Object | Date | Array<any>;

/**
 * Deep copy an object, supports dates, arrays and objects.
 * @param _target Target object to be copied.
 */
function deepCopy(_target: CloneableObject): CloneableObject {

    if (_target === null) return _target;
    if (_target instanceof Date) return new Date(_target.getTime());

    if (_target instanceof Array) {

      const clone: any[] = [];
      _target.forEach(_index => clone.push(_index));

      return clone.map(_index => deepCopy(_index));

    }

    if (typeof _target === "object" && _target !== {}) {

      const clone: {[key: string]: any} = {..._target};

      Object.keys(clone).forEach(_key => {

        clone[_key] = deepCopy(clone[_key]);

      });

      return clone;

    }

    return _target;

}

export {deepCopy, CloneableObject};