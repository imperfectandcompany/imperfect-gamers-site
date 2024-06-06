// ~/utils/tebex.interface.ts
export interface TebexCheckoutConfig {
	ident: string
	theme: 'light' | 'dark'
	colors?: Color[]
}

export interface Color {
	name: string
	color: string
}

export interface TebexCheckout {
	init: (config: TebexCheckoutConfig) => void
	launch: () => void
	closePopup: () => void
	on: (event: string, callback: (event?: any) => void) => void
}

export interface TebexEvents {
	OPEN: string
	CLOSE: string
	PAYMENT_COMPLETE: string
	PAYMENT_ERROR: string
}

/**
 * @interface GiftCardCodeBody
 * @description The gift card code object for the body of the request
 *
 * @param {string} card_number The gift card code to apply or remove
 */
export interface GiftCardCode {
	card_number: string
}

/**
 * @interface Data
 * @description The data returned from the Tebex Headless API
 *
 * @type {T} The type of data to be returned
 */
export interface Data<T> {
	data: T
}

/**
 * @type {PackageType}
 * @description The type of the package
 *
 * @param {string} subscription The subscription type
 * @param {string} single The single type
 */
export type PackageType = 'subscription' | 'single' | 'both'

/**
 *  * @interface Package
 * @description The package object returned from the Tebex Headless API
 *
 * @param {number} id The ID of the package
 * @param {string} name The name of the package
 * @param {string} description The description of the package
 * @param {PackageType} type The type of the package
 * @param {boolean} disable_gifting Whether gifting is disabled for the package
 * @param {boolean} disable_quantity Whether quantity is disabled for the package
 * @param {string | null} expiration_date The expiration date of the package
 * @param {ShortCategory} category The category of the package
 * @param {number} base_price The base price of the package
 * @param {number} sales_tax The sales tax of the package
 * @param {number} total_price The total price of the package
 * @param {number} discount The discount of the package
 * @param {string | null} image The image of the package
 * @param {string} created_at The date the package was created
 * @param {string} updated_at The date the package was updated
 */
export type Package = BaseItem & {
	description: string
	type: PackageType
	disable_gifting: boolean
	disable_quantity: boolean
	expiration_date: string | null
	currency: string
	category: BaseItem
	base_price: number
	sales_tax: number
	total_price: number
	discount: number
	image: string | null
	created_at: string
	updated_at: string
}

/**
 * @interface Code
 * @description The code object inside the basket coupons object
 *
 * @param {string} code The code of the object
 */
export interface Code {
	code: string
}

/**
 * @interface InBasket
 * @description The in_basket object inside a basket package object
 *
 * @param {number} quantity The quantity of the package in the basket
 * @param {number} price The price of the package in the basket
 * @param {string | null} gift_username_id The ID of the user the package is gifted to
 * @param {string | null} gift_username The username of the user the package is gifted to
 */
export interface InBasket {
	quantity: number
	price: number
	gift_username_id: string | null
	gift_username: string | null
}

/**
 * @interface BaseItem
 * @description The base item object for the package and category objects
 *
 * @param {number} id The ID of the base item
 * @param {string} name The name of the base item
 */
export interface BaseItem {
	id: number
	name: string
}

/**
 * @interface BasketPackage
 * @description The basket package object returned from the Tebex Headless API
 *
 * @param {number} id The ID of the package
 * @param {string} name The name of the package
 * @param {string} description The description of the package
 * @param {InBasket} in_basket The in_basket object inside the basket package object
 * @param {string | null} image The image of the package
 */
export type BasketPackage = BaseItem & {
	description: string
	in_basket: InBasket
	image: string | null
}

/**
 * @interface Links
 * @description The links object inside the basket object
 *
 * @param {string} checkout The checkout link of the basket
 */
export interface Links {
	checkout: string
	[key: string]: string
}

/**
 * @type {KeyValuePair}
 * @description A key value pair
 *
 * @type {K} The type of the key
 * @type {V} The type of the value
 */
export type KeyValuePair<K extends string | number, V> = {
	[key in K]: V
}

/**
 * @interface Basket
 * @description The basket object returned from the Tebex Headless API
 *
 * @param {string} ident The identifier of the basket
 * @param {boolean} complete Whether the basket is complete
 * @param {number} id The ID of the basket
 * @param {string} country The country of the basket
 * @param {string} ip The IP address of the user
 * @param {string | null} username_id The ID of the user
 * @param {string | null} username The username of the user
 * @param {string} cancel_url The cancel url of the basket
 * @param {string} complete_url The complete url of the basket
 * @param {boolean} complete_auto_redirect Whether the basket should automatically redirect to the complete url
 * @param {number} base_price The base price of the basket
 * @param {number} sales_tax The sales tax of the basket
 * @param {number} total_price The total price of the basket
 * @param {string} currency The currency of the basket
 * @param {BasketPackage[]} packages The packages in the basket
 * @param {Code[]} coupons The coupons in the basket
 * @param {GiftCardCode[]} giftcards The giftcards in the basket
 * @param {string} creator_code The creator code of the basket
 * @param {Links} links The links of the basket
 * @param {KeyValuePair<string, any>} custom The custom object of the basket
 */
export interface Basket {
	ident: string
	complete: boolean
	id: number
	country: string
	ip: string
	username_id: string | null
	username: string | null
	cancel_url: string
	complete_url: string
	complete_auto_redirect: boolean
	base_price: number
	sales_tax: number
	total_price: number
	currency: string
	packages: BasketPackage[]
	coupons: Code[]
	giftcards: GiftCardCode[]
	creator_code: string
	links: Links
	custom: KeyValuePair<string, any>
}
