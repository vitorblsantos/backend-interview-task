import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { toZonedTime, format as formatDateZoned } from 'date-fns-tz'

export const TIMEZONE = 'America/Sao_Paulo'

export const formatTimestamp = (timestamp: string) => {
  const zonedTime = toZonedTime(timestamp, TIMEZONE)
  return formatDateZoned(zonedTime, 'yyyy-MM-dd HH:mm:ss', {
    timeZone: TIMEZONE
  })
}

export const formatDayMonthYear = (timestamp: string) => {
  const zonedTime = toZonedTime(timestamp, TIMEZONE)
  return formatDateZoned(zonedTime, 'dd/MM/yyyy', {
    timeZone: TIMEZONE
  })
}

export const getDatePostgresTimestamp = (): string => {
  const _date = new Date()
  const formattedDate = format(_date, 'yyyy-MM-dd HH:mm:ss', { locale: ptBR })
  return formattedDate
}
