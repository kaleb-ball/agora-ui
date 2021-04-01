export const platformConstants = {
    PLATFORM_VALUES: [
        'zoom', 'teams'
    ],

    PLATFORM_NAMES : {
        ZOOM : 'zoom',
        TEAMS : 'teams',
    }

}

const platforms = [
    {
        name: 'Zoom',
        value: 'zoom',
        color: '#2681F2'
    },
    {
        name : 'Teams',
        value : 'teams',
        color : '#464EB8'
    }
]

export function platform_color(name) {
    return platforms.filter(platform => platform.value === name)[0].color
}

export function platform_name(name) {
    return platforms.filter(platform => platform.value === name)[0].name
}

export function platform_value(name) {
    return platforms.filter(platform => platform.value === name)[0].value
}

export function number_of_platforms() {
    return platforms.length;
}