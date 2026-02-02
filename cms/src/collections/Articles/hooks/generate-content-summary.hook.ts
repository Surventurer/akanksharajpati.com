import { Article } from '@/payload-types'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'
import { FieldHook } from 'payload'
import { MAX_SUMMARY_LENGTH } from '../constants'

export const generateContentSummaryHook: FieldHook<Article, string> = ({ value, data }) => {
    if (value) return value.trim()
    if (!data?.content) return ''
    const text = convertLexicalToPlaintext({ data: data?.content }).trim()
    if (!text) return ''
    return text.length > MAX_SUMMARY_LENGTH ? `${text.slice(0, MAX_SUMMARY_LENGTH - 3)}...` : text
}
