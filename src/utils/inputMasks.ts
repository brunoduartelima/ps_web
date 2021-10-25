export function maskPhone(value: string){
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d)/, '($1) $2')
    value = value.replace(/(\d{4,5})(\d{4})/, '$1-$2')
    value = value.replace(/(-\d{4})\d+?$/, '$1')

    return value;
}

export function maskCpf(value: string){
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d{1,2})/, '$1-$2')
    value = value.replace(/(-\d{2})\d+?$/, '$1')

    return value;
}

export function maskCep(value: string){
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{5})(\d)/, '$1-$2')
    value = value.replace(/(-\d{3})\d+?$/, '$1')

    return value;
}

export function maskMoney(value: string){
    value = value.replace(/[^\d]+/gi,'').split('').reverse().join('');
    var result  = "";
    var mask = "###.###.###.###.###,##".split('').reverse().join('');
    for (var x=0, y=0; x < mask.length && y < value.length;) {
      if (mask.charAt(x) !== '#') {
        result += mask.charAt(x);
        x++;
      } else {
        result += value.charAt(y);
        y++;
        x++;
      }
    }
    value = result.split('').reverse().join('');
    return value;
}