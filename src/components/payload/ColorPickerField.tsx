'use client'

import * as React from 'react'
import { useField, FieldLabel, TextInput } from '@payloadcms/ui'
import type { TextField } from 'payload'

export const ColorPickerField = (props: any) => {
    const { path, field } = props
    const { value, setValue } = useField<string>({ path })

    return (
        <div className="field-type text">
            <FieldLabel label={field?.label as string} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                    position: 'relative',
                    width: '40px',
                    height: '40px',
                    borderRadius: '4px',
                    padding: 0,
                    overflow: 'hidden',
                    border: '1px solid var(--theme-elevation-150)',
                    cursor: 'pointer'
                }}>
                    <input
                        type="color"
                        value={value || '#000000'}
                        onChange={(e) => setValue(e.target.value)}
                        style={{
                            border: 'none',
                            width: '150%',
                            height: '150%',
                            position: 'absolute',
                            top: '-25%',
                            left: '-25%',
                            cursor: 'pointer',
                            padding: 0,
                            margin: 0,
                        }}
                    />
                </div>
                <div style={{ flexGrow: 1 }}>
                    <TextInput
                        path={path}
                        value={value || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}
