export default {
    chart: { color: 'rgb(4, 160, 249)' },
    box: { bg: 'rgb(255, 255, 255)', alt: 'rgb(220, 222, 229)', body: 'rgb(0, 0, 0)' },
    bar: { bg: 'rgb(31, 14, 62)', hover: 'rgb(56, 34, 95)', alt: 'rgb(70, 43, 120)', color: 'rgb(240, 242, 246)' },
    label: { color: 'rgb(0, 0, 0)', hover: 'rgb(4, 160, 249)' },
    input: {
        bg: 'rgb(224, 226, 231)',
        alt: 'rgb(114, 114, 114)',
        hover: 'rgba(0, 0, 0, 0.4)',
        color: 'rgb(30, 30, 30)',
    },
    negative: { color: 'rgb(219, 112, 59)', hover: 'rgb(155, 0, 13)', body: 'rgb(255, 255, 255)' },
    positive: { color: 'rgb(85, 160, 91)', hover: 'rgb(24, 91, 72)', body: 'rgb(255, 255, 255)' },
    dark: { color: 'rgb(214, 216, 223)', hover: 'rgb(204, 206, 213)', body: 'rgb(0, 0, 0)' },
    secondary: { color: 'rgb(140, 48, 164)', hover: 'rgb(119, 41, 140)', body: 'rgb(255, 255, 255)' },
    primary: {
        color: 'rgb(4, 160, 249)',
        border: 'rgba(255, 255, 255, 0)',
        hover: 'rgb(3, 139, 217)',
        body: 'rgb(255, 255, 255)',
    },
    body: { bg: 'rgb(232, 235, 241)', color: 'rgb(0, 0, 0)', alt: 'rgba(0, 0, 0, 0.25)' },
    wave: { primary: 'rgba(140, 48, 164, 0.5)', secondary: 'rgba(0, 0, 0, 0.12)' },
    isDark: false,
    animations: [
        'body.color',
        'body.bg',
        'rgb(145,145,145)',
        'primary.color',
        'bar.alt',
        'dark.hover',
        'bar.hover',
        'input.alt',
        'rgb(188,189,193)',
        'label.color',
        'primary.body',
    ],
};