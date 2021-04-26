/**
 * Array which needs to be updated with platform values from the API. All fields are required.
 */
const platforms = [
    {
        id : 1,
        name: 'Zoom',
        value: 'zoom',
        color: '#2681F2'
    },
    {
        id : 3,
        name : 'Webex',
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

export function get_value_by_id(id) {
    return platforms.filter(platform => platform.id === id)[0].value
}

export function get_id_by_value(value) {
    return platforms.filter(platform => platform.value === value)[0].id

}