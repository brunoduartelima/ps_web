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