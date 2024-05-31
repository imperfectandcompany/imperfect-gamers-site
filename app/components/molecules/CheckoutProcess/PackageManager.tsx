export const hasSpecificPackage = (packages: any[], packageId: number) => {
	return packages.some(pkg => pkg.id === packageId)
}
