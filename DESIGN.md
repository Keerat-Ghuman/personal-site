# Keerat Ghuman portfolio redesign

## References and component choices

| Reference | Pattern to adapt | Application |
| --- | --- | --- |
| [Basement Studio](https://basement.studio/) | A compact introduction hands off to a featured-project lineup. Each entry pairs a subject with a short explanation. | Make the project index the next stop after the introduction and tool strip. Give each project its own label and clear selected state. |
| [Brittany Chiang](https://brittanychiang.com/) | Experience is arranged by date, with role, employer, and tools grouped together for scanning. | Use dated cards and place the RBC and Autodesk metrics directly beside their definitions. |
| [Linear](https://linear.app/) | The homepage shows a concrete working surface, including an issue and its activity and properties. | Let the summarizer’s editable source and extracted result supply the UI detail. Use two adjacent panes on wide screens and stack them on phones. |
| [W3C carousel guidance](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) | Previous and next actions, direct selection, and user control over movement. | Keep the anchor-based project index, ordered navigation, progress, focus handoff, and browser history. Project switching stays manual. |
| [Radix Tabs](https://www.radix-ui.com/primitives/docs/components/tabs) | A clear active trigger is paired with a single visible content panel. | Adapt the visual relationship using the existing deep-linkable anchors. Radix is [MIT-licensed](https://raw.githubusercontent.com/radix-ui/primitives/main/LICENSE). An imported React primitive would add a dependency to a buildless page, so the implementation stays in HTML, CSS, and JavaScript. |

The portfolio and studio pages inform layout and interaction. The build uses original markup, styles, and CSS shapes, plus the existing owner-supplied photo and résumé. Barlow Condensed remains local under the [SIL Open Font License](https://github.com/google/fonts/blob/main/ofl/barlowcondensed/OFL.txt). No reference site images or code are included.

## Composition

- Use an ice-blue canvas, indigo type, cobalt links and buttons, and a lilac portrait field. Use system sans for prose and Barlow Condensed for the lead statement and section titles.
- Put the full name in the header and hero. Lead with the existing software-engineering identity as the display headline, followed by the concrete explanation of the tools Keerat has built. Frame the real portrait with a circular crop, restrained orbital lines, surrounding the image. Put Work and Résumé actions beside the introduction.
- Make the existing moving tools strip the transition into a three-column project picker. Directly below the picker, open one case with its source link, three narrative blocks, and the extraction demo where applicable. Use a cobalt selection treatment, a prominent focus ring, and short entrance motion tied to the existing pause control and device setting.
- Set the four dated career entries in a two-column layout followed by a cobalt contact band. Preserve the dates, claims, definitions, and existing destinations. Fold to one column on narrow screens, with wrap-safe text and navigation.
- Verify the portrait and résumé bytes, exactly three source links, phone widths down to 320px, expanded project navigation and browser Back, keyboard focus, motion on and off, and extraction with sample, edited and empty input. Verify an unenhanced read of all three case studies.
