const platforms = [
    {
        name: 'Zoom',
        value: 'zoom',
        color: '#2681F2'
    },
    {
        name : 'WebEx',
        value : 'webex',
        color : '#009EDC'
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

export function get_values() {
    let values = []
    platforms.forEach(platform => values.push(platform.value));
    return values;
}

export function get_authenticated_platforms() {
    return localStorage.getItem('authenticatedPlatforms') ? JSON.parse(localStorage.getItem('authenticatedPlatforms')) : []
}