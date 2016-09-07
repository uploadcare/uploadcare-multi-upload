export default function(width = 100, height = 100) {
	// Hash in the end to avoid browser caching images
	const hash = Math.floor(Math.random() * 10000)

	return `http://placekitten.com/${width}/${height}?h=${hash}`
}
