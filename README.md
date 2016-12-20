# uploadcare-multi-upload

Use JS to upload multiple images at once with
[Uploadcare REST API](https://uploadcare.com/documentation/rest/).

## Requirements

It is implied that prior to using multi-upload with REST API,
you have already been registered with [Uploadcare](https://uploadcare.com).
You will also need to create a project from your
[dashboard](https://uploadcare.com/dashboard/). This way you'll
be able to obtain public and secret keys for your project.

## Install

```
npm install uploadcare-multi-upload --save
```

## Usage

Please note, in order to use `uploadcare-multi-upload` you'll need to
grab your [public and secret keys](https://uploadcare.com/documentation/keys/).

```javascript
import uploadcareMultiUpload from 'uploadcare-multi-upload'

const multiUpload = uploadcareMultiUpload('YOUR_PUBLIC_KEY', 'YOUR_SECRET_KEY')
const images = [
	{
		id: 1,
		src: 'http://placekitten.com/300/200',
	},
	{
		id: 2,
		src: 'http://placekitten.com/600/400',
	},
]
const onSuccessUpload = (image) => {
	console.log(JSON.stringify(image))
}

const onFailUpload = (image, error) => {
	console.log('error ', image, error)
}

multiUpload.fromUrls(images, 'src', onSuccessUpload, onFailUpload)
		.then(() => console.log('All images uploaded')
```

## Contributors

* [@Zmoki](https://github.com/Zmoki)
