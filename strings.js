/*
Welcome to "Strings"

*** THIS FILE IS UNDER CONSTRUCTION, IT HAS NO TEST FILE YET ***

This is simply a collection of string utilities which I have found useful.  I am wrote this class in the form
of a set of stand-alone static functions and in class form which make use of the static functions and provides for
changing.

I would appreciate any feedback you may have.
*/



let Strings = (function(ref = null) {
    let name = 'Strings';

    let __coreStr = null;
    let refType = typeof ref;
    if (ref === null || ref === '') {
        __coreStr = '';
    } else if (refType === 'string') {
        __coreStr = ref;
    } else if (refType === 'object') {
        if (typeof ref.str !== 'undefined') {
            __coreStr = ref.str();
        }
    } else {
        window.console.error('Strings::constructor - Unrecognized ref', ref);
    }

    function str() {
        return __coreStr;
    }

    function isEmpty() {
        return __coreStr === '';
    }

    function equals(rightSide) {
        rightSide = typeof rightSide.name !== 'undefined' ? rightSide.str() : rightSide;
        return __coreStr === rightSide;
    }

    function count(needle) {
        needle = typeof needle.name !== 'undefined' ? needle.str() : needle;
        if (__coreStr === '' || needle === '') {
            return 0;
        }

        return __coreStr.split(needle).length - 1;
    }

    function starts(needle) {
        needle = typeof needle.name !== 'undefined' ? needle.str() : needle;
        if ((__coreStr !== '' && needle === '') || (__coreStr === '' && needle !== '')) {
            return false;
        }
        if (typeof needle !== 'string') {
            window.console.error('Strings::starts - needle is not a string', needle);
            return false;
        }

        return __coreStr.startsWith(needle);
    }

    function ends(needle) {
        needle = typeof needle.name !== 'undefined' ? needle.str() : needle;
        if ((__coreStr !== '' && needle === '') || (__coreStr === '' && needle !== '')) {
            return false;
        }
        if (typeof needle !== 'string') {
            window.console.error('Strings::ends - needle is not a string', needle);
            return false;
        }

        return __coreStr.endsWith(needle);
    }

    function contains(needle) {
        needle = typeof needle.name !== 'undefined' ? needle.str() : needle;
        if ((__coreStr !== '' && needle === '') || (__coreStr === '' && needle !== '')) {
            return false;
        }
        if (typeof needle !== 'string') {
            window.console.error('Strings::contains - needle is not a string', needle);
            return false;
        }

        return __coreStr.includes(needle);
    }

    function prepend(ref)
    {
        ref = typeof ref.name !== 'undefined' ? ref.str() : ref;
        if (ref === '') {
            return Strings(__coreStr);
        }
        if (typeof ref !== 'string') {
            window.console.error('Strings::prepend - ref is not a string', ref);
            return false;
        }
        return Strings(ref + __coreStr);
    }

    function append(ref)
    {
        ref = typeof ref.name !== 'undefined' ? ref.str() : ref;
        if (ref === '') {
            return Strings(__coreStr);
        }
        if (typeof ref !== 'string') {
            window.console.error('Strings::append - ref is not a string', ref);
            return false;
        }
        return Strings(__coreStr + ref);
    }

    function stripHtml()
    {
        let mod = __coreStr.replace(/<(?:.|\n)*?>/gm, '');
        mod = String(mod).trim();

        return Strings(mod);
    }

    function conditionForXML()
    {
        let conditioned = String(refStr).trim();
        var before = '';
        while( conditioned != before )
        {
            before = conditioned;
            conditioned = conditioned.replace('&',  ' and ');
            conditioned = conditioned.replace('  ', ' ');
        }
        return Strings(conditioned);
    }

    function ltrim(needle) {
        needle = typeof needle.name !== 'undefined' ? needle.str() : needle;
        if (typeof needle !== 'string') {
            window.console.error('Strings::ltrim - needle is not a string', needle);
            return false;
        }

        if (__coreStr === '' || needle === '' || (__coreStr.length < needle.length)) {
            return Strings(__coreStr);
        }

        if (__coreStr.startsWith(needle)) {
            let mod = __coreStr.substring(needle.length);
            let ret = Strings(mod);

            if (mod.startsWith(needle)) {
                return ret.rtrim(needle);
            }

            return ret;
        }

        return Strings(__coreStr);
    }

    function rtrim(needle) {
        needle = typeof needle.name !== 'undefined' ? needle.str() : needle;
        if (typeof needle !== 'string') {
            window.console.error('Strings::rtrim - needle is not a string', needle);
            return false;
        }

        if (__coreStr === '' || needle === '' || (__coreStr.length < needle.length)) {
            return Strings(__coreStr);
        }

        if (__coreStr.endsWith(needle)) {
            let diff = __coreStr.length - needle.length;
            let mod = __coreStr.substring(0, diff);
            let ret = Strings(mod);

            if (mod.endsWith(needle)) {
                return ret.rtrim(needle);
            }

            return ret;
        }

        return Strings(__coreStr);
    }

    function trim(needle = ' ') {
        needle = typeof needle.name !== 'undefined' ? needle.str() : needle;
        if (typeof needle !== 'string') {
            window.console.error('Strings::trim - needle is not a string', needle);
            return false;
        }

        if (__coreStr === '' || needle === '' || (__coreStr.length < needle.length)) {
            return Strings(__coreStr);
        }

        return ltrim(needle).rtrim(needle);
    }

    function whitespaceCondense() {
        let before = '';
        let mod = __coreStr;
        while (before != mod) {
            before = mod;
            mod = mod.replace('\n\r', '\n');
            mod = mod.replace('\r\n', '\n');
            mod = mod.replace(' \n',  '\n');
            mod = mod.replace('\n ',  '\n');
            mod = mod.replace(' \t',  '\t');
            mod = mod.replace('\t ',  '\t');
            mod = mod.replace('  ', ' ');
        }
        return Strings(mod);
    }

    function stripBeforeTag(tag) {
        tag = typeof tag.name !== 'undefined' ? tag.str() : tag;

        // Error Check - Bad tag
        if (typeof tag !== 'string') {
            window.console.error('Strings::stripBeforeTag - tag is not a string', tag);
            return false;
        }

        if (tag === '') {
            return String(__coreStr);
        }

        let pos = __coreStr.indexOf(tag);
        if (pos === -1) {
            return String(__coreStr);
        }

        let mod = __coreStr.substring(pos);
        return Strings(mod);
    }

    function stripAfterTag(tag) {
        tag = typeof tag.name !== 'undefined' ? tag.str() : tag;

        // Error Check - Bad tag
        if (typeof tag !== 'string') {
            window.console.error('Strings::stripAfterTag - tag is not a string', tag);
            return false;
        }

        if (tag === '') {
            return String(__coreStr);
        }

        let pos = __coreStr.indexOf(tag);
        if (pos === -1) {
            return String(__coreStr);
        }
        pos += tag.length;

        let mod = __coreStr.substring(0, pos);
        return Strings(mod);
    }

    function explode(delimit) {
        let delimitCount = count(delimit);
        if (delimitCount >= 1) {
            // Do nothing
        } else if (delimitCount == 0) {
            let retItem = Strings(__coreStr);
            return [retItem];
        } else {
            return [];
        }

        let bits = __coreStr.split(delimit);
        let bitsSize = bits.length;
        let ret = [];
        for (let i=0; i<bitsSize; i++) {
            ret.push(Strings(bits[i]));
        }

        return ret;
    }

    function implode(glue, bits) {
        let bitsSize = bits.length;
        if (bitsSize === 1) {
            return bits[0];
        }
        return bits.join(glue);
    }

    function isValidEmail() {
        let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(__coreStr);
    }

    function getPasswordStrengthError() {
        let lowerCaseRegEx = new RegExp("[a-z]+", "g");
        let upperCaseRegEx = new RegExp("[A-Z]+", "g");
        let numberRegEx = new RegExp("[0-9]+", "g");
        let symbolRegEx = new RegExp("[!@#$%^&*]+", "g");
        let mustHave = 'Must have a lower case, an upper case, a number and a symbol (!@#$%^&*)';

        if (__coreStr.length == 0) {
            return Strings('Missing password');
        } else if (__coreStr.length < 8) {
            return Strings('Minimum password length is 8 characters');
        } else if (!lowerCaseRegEx.test(__coreStr)) {
            return Strings('Missing a lower case letter.  ' + mustHave);
        } else if (!upperCaseRegEx.test(__coreStr)) {
            return Strings('Missing an upper case letter.  ' + mustHave);
        } else if (!numberRegEx.test(__coreStr)) {
            return Strings('Missing a number.  ' + mustHave);
        } else if (!symbolRegEx.test(__coreStr)) {
            return Strings('Missing a symbol.  ' + mustHave);
        }

        return null;
    }



    return {
        __coreStr: __coreStr,
        name: name,
        str: str,
        isEmpty: isEmpty,
        equals: equals,
        count: count,
        starts: starts,
        ends: ends,
        contains: contains,
        prepend: prepend,
        append: append,
        stripHtml: stripHtml,
        conditionForXML: conditionForXML,
        ltrim: ltrim,
        rtrim: rtrim,
        trim: trim,
        whitespaceCondense: whitespaceCondense,
        stripBeforeTag: stripBeforeTag,
        stripAfterTag: stripAfterTag,
        explode: explode,
        implode: implode,
        isValidEmail: isValidEmail,
        getPasswordStrengthError: getPasswordStrengthError,
    }
});
