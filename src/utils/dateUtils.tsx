// função que formata a data de yyyy-MM-dd para dd/MM/yyyy
export const formatDate = (data: string) => {
    return data.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1')
}