import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'


function RTE({name,control,defaultValues = ""}) {
  
  
  return (
    <div>
    <Controller 
    name={name || 'content'}
    control={control}
    render={({field: { onChange, value }})=>(
        <Editor
        apiKey='bsx7vylav1bic2rdi8w66c9fc6ga8wtsyc46mm89kbv2pwp8'
        value={value}
        init={{
            initialValue:defaultValues,
            height:500,
            plugins:[
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={(content) => onChange(content)}
        />
    )}
    />
    </div>
  )
}

export default RTE