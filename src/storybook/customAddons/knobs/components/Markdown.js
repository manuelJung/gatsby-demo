// @flow
import * as React from 'react'
import SimpleMDE from 'react-simplemde-editor'
import styled from 'styled-components'

type Props = {
  value: string,
  onChange: (val:string) => mixed
}

export default function Markdown ({value, onChange}) {
  const [focused, setFocused] = React.useState(false)
  return (
    <Wrapper focused={focused}>
      <SimpleMDE 
        onChange={onChange}
        value={value}
        events={{
          'blur': (e) => setFocused(false),
          'focus': (e) => setFocused(true),
        }}
        options={{
          spellChecker: false,
          toolbar: true,
          minHeight: '50px'
        }}
      />
    </Wrapper>
  )
}


const Wrapper = styled.div`
  border: 2px solid ${props => props.focused ? '#1EA7FD' : 'lightgrey'};
  border-radius: 5px;

    .CodeMirror {
      color: #000;
      min-height: 60px;
    }

    .CodeMirror-lines {
      padding: 4px 0;
    }

    .CodeMirror pre {
      padding: 0 4px;
    }

    .CodeMirror-gutter-filler,
    .CodeMirror-scrollbar-filler {
      background-color: #fff;
    }

    .CodeMirror-gutters {
      border-right: 1px solid #ddd;
      background-color: #f7f7f7;
      white-space: nowrap;
    }

    .CodeMirror-guttermarker-subtle {
      color: #999;
    }

    .CodeMirror-cursor {
      border-left: 1px solid #000;
      border-right: none;
      width: 0;
    }

    .CodeMirror div.CodeMirror-secondarycursor {
      border-left: 1px solid silver;
    }

    .cm-fat-cursor .CodeMirror-cursor {
      width: auto;
      border: 0 !important;
      background: #7e7;
    }

    .cm-fat-cursor div.CodeMirror-cursors {
      z-index: 1;
    }

    .cm-animate-fat-cursor {
      width: auto;
      border: 0;
      -webkit-animation: blink 1.06s steps(1) infinite;
      -moz-animation: blink 1.06s steps(1) infinite;
      animation: blink 1.06s steps(1) infinite;
      background-color: #7e7;
    }

    @-moz-keyframes blink {
      50% {
        background-color: transparent;
      }
    }

    @-webkit-keyframes blink {
      50% {
        background-color: transparent;
      }
    }

    @keyframes blink {
      50% {
        background-color: transparent;
      }
    }

    .cm-tab {
      display: inline-block;
      text-decoration: inherit;
    }

    .CodeMirror-ruler {
      border-left: 1px solid #ccc;
      position: absolute;
    }

    .cm-s-default .cm-header {
      color: #00f;
    }

    .cm-s-default .cm-quote {
      color: #090;
    }

    .cm-negative {
      color: #d44;
    }

    .cm-positive {
      color: #292;
    }

    .cm-header,
    .cm-strong {
      font-weight: 700;
    }

    .cm-em {
      font-style: italic;
    }

    .cm-link {
      text-decoration: underline;
    }

    .cm-s-default .cm-keyword {
      color: #708;
    }

    .cm-s-default .cm-atom {
      color: #219;
    }

    .cm-s-default .cm-number {
      color: #164;
    }

    .cm-s-default .cm-def {
      color: #00f;
    }

    .cm-s-default .cm-variable-2 {
      color: #05a;
    }

    .cm-s-default .cm-variable-3 {
      color: #085;
    }

    .cm-s-default .cm-comment {
      color: #a50;
    }

    .cm-s-default .cm-string {
      color: #a11;
    }

    .cm-s-default .cm-string-2 {
      color: #f50;
    }

    .cm-s-default .cm-meta,
    .cm-s-default .cm-qualifier {
      color: #555;
    }

    .cm-s-default .cm-builtin {
      color: #30a;
    }

    .cm-s-default .cm-bracket {
      color: #997;
    }

    .cm-s-default .cm-tag {
      color: #170;
    }

    .cm-s-default .cm-attribute {
      color: #00c;
    }

    .cm-s-default .cm-hr {
      color: #999;
    }

    .cm-s-default .cm-link {
      color: #00c;
    }

    .cm-invalidchar,
    .cm-s-default .cm-error {
      color: red;
    }

    .CodeMirror-composing {
      border-bottom: 2px solid;
    }

    div.CodeMirror span.CodeMirror-matchingbracket {
      color: #0f0;
    }

    div.CodeMirror span.CodeMirror-nonmatchingbracket {
      color: #f22;
    }

    .CodeMirror-matchingtag {
      background: rgba(255, 150, 0, 0.3);
    }

    .CodeMirror-activeline-background {
      background: #e8f2ff;
    }

    .CodeMirror {
      position: relative;
      overflow: hidden;
      background: #fff;
    }

    .CodeMirror-scroll {
      overflow: scroll !important;
      margin-bottom: -30px;
      margin-right: -30px;
      padding-bottom: 30px;
      height: 100%;
      outline: 0;
      position: relative;
    }

    .CodeMirror-sizer {
      position: relative;
      border-right: 30px solid transparent;
    }

    .CodeMirror-gutter-filler,
    .CodeMirror-hscrollbar,
    .CodeMirror-scrollbar-filler,
    .CodeMirror-vscrollbar {
      position: absolute;
      z-index: 6;
      display: none;
    }

    .CodeMirror-vscrollbar {
      right: 0;
      top: 0;
      overflow-x: hidden;
      overflow-y: scroll;
    }

    .CodeMirror-hscrollbar {
      bottom: 0;
      left: 0;
      overflow-y: hidden;
      overflow-x: scroll;
    }

    .CodeMirror-scrollbar-filler {
      right: 0;
      bottom: 0;
    }

    .CodeMirror-gutter-filler {
      left: 0;
      bottom: 0;
    }

    .CodeMirror-gutters {
      position: absolute;
      left: 0;
      top: 0;
      min-height: 100%;
      z-index: 3;
    }

    .CodeMirror-gutter {
      white-space: normal;
      height: 100%;
      display: inline-block;
      vertical-align: top;
      margin-bottom: -30px;
    }

    .CodeMirror-gutter-wrapper {
      position: absolute;
      z-index: 4;
      background: 0 0 !important;
      border: none !important;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
    }

    .CodeMirror-gutter-background {
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: 4;
    }

    .CodeMirror-gutter-elt {
      position: absolute;
      cursor: default;
      z-index: 4;
    }

    .CodeMirror-lines {
      cursor: text;
      min-height: 1px;
    }

    .CodeMirror pre {
      -moz-border-radius: 0;
      -webkit-border-radius: 0;
      border-radius: 0;
      border-width: 0;
      background: 0 0;
      font-family: Montserrat, Helvetica, Arial, sans-serif;
      font-size: 16px;
      margin: 0;
      white-space: pre;
      word-wrap: normal;
      line-height: inherit;
      color: inherit;
      z-index: 2;
      position: relative;
      overflow: visible;
      -webkit-tap-highlight-color: transparent;
      -webkit-font-variant-ligatures: none;
      font-variant-ligatures: none;
      font-size: 16px;
      line-height: 1.58;
      letter-spacing: -0.004em;
      font-weight: 400;
      font-style: normal;
      color: #555;
    }

    .CodeMirror-wrap pre {
      word-wrap: break-word;
      white-space: pre-wrap;
      word-break: normal;
    }

    .CodeMirror-linebackground {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 0;
    }

    .CodeMirror-linewidget {
      position: relative;
      z-index: 2;
      overflow: auto;
    }

    .CodeMirror-code {
      outline: 0;
    }

    .CodeMirror-gutter,
    .CodeMirror-gutters,
    .CodeMirror-linenumber,
    .CodeMirror-scroll,
    .CodeMirror-sizer {
      -moz-box-sizing: content-box;
      box-sizing: content-box;
    }

    .CodeMirror-measure {
      position: absolute;
      width: 100%;
      height: 0;
      overflow: hidden;
      visibility: hidden;
    }

    .CodeMirror-cursor {
      position: absolute;
    }

    .CodeMirror-measure pre {
      position: static;
    }

    div.CodeMirror-cursors {
      visibility: hidden;
      position: relative;
      z-index: 3;
    }

    .CodeMirror-focused div.CodeMirror-cursors,
    div.CodeMirror-dragcursors {
      visibility: visible;
    }

    .CodeMirror-selected {
      background: #d9d9d9;
    }

    .CodeMirror-focused .CodeMirror-selected,
    .CodeMirror-line::selection,
    .CodeMirror-line > span::selection,
    .CodeMirror-line > span > span::selection {
      background: #d7d4f0;
    }

    .CodeMirror-crosshair {
      cursor: crosshair;
    }

    .CodeMirror-line::-moz-selection,
    .CodeMirror-line > span::-moz-selection,
    .CodeMirror-line > span > span::-moz-selection {
      background: #d7d4f0;
    }

    .cm-searching {
      background: #ffa;
      background: rgba(255, 255, 0, 0.4);
    }

    .cm-force-border {
      padding-right: 0.1px;
    }

    @media print {
      .CodeMirror div.CodeMirror-cursors {
        visibility: hidden;
      }
    }

    .cm-tab-wrap-hack:after {
      content: "";
    }

    span.CodeMirror-selectedtext {
      background: 0 0;
    }

    .CodeMirror {
      border: 1px solid #ddd;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      padding: 10px;
      font: inherit;
      z-index: 1;
    }

    .editor-statusbar {
      padding: 2px 2px;
      font-size: 14px;
      color: #959694;
      text-align: left;
    }

    .editor-statusbar span {
      display: inline-block;
      min-width: 4em;
      margin-left: 1em;
    }

    .editor-statusbar .lines:before {
      content: "Zeilen: ";
    }

    .editor-statusbar .words:before {
      content: "Wörter: ";
    }
    .editor-statusbar .cursor {
      display: none;
    }
    .CodeMirror .CodeMirror-code .cm-tag {
      color: #63a35c;
    }

    .CodeMirror .CodeMirror-code .cm-attribute {
      color: #795da3;
    }

    .CodeMirror .CodeMirror-code .cm-string {
      color: #183691;
    }

    .CodeMirror .CodeMirror-selected {
      background: #d9d9d9;
    }

    .CodeMirror .CodeMirror-code .cm-header-1 {
      font-size: 200%;
      line-height: 200%;
    }

    .CodeMirror .CodeMirror-code .cm-header-2 {
      font-size: 160%;
      line-height: 160%;
    }

    .CodeMirror .CodeMirror-code .cm-header-3 {
      font-size: 125%;
      line-height: 125%;
    }

    .CodeMirror .CodeMirror-code .cm-header-4 {
      font-size: 110%;
      line-height: 110%;
    }

    .CodeMirror .CodeMirror-code .cm-link {
      color: #993452;
    }

    .CodeMirror .CodeMirror-code .cm-url {
      color: #993452;
    }

    .CodeMirror .CodeMirror-placeholder {
      opacity: 0.5;
    }
  }
`