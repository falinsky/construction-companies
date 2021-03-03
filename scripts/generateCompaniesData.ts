import faker from 'faker'
import fs from 'fs'
import path from 'path'

function generateColor() {
  return faker.internet.color().slice(1)
}

function generateAbbreviation(name: string) {
  return name
    .split(' ')
    .map((word) => word[0].toUpperCase())
    .join('')
}

const itemsAmount = Number(process.argv[2] ?? 500)

const data = []

for (let i = 0; i < itemsAmount; i++) {
  const companyName = faker.company.companyName()
  const abbr = generateAbbreviation(companyName)

  data.push({
    id: i + 1,
    name: companyName,
    logo: `https://via.placeholder.com/100/${generateColor()}/${generateColor()}.png?text=${abbr}`,
    specialty: faker.random.arrayElement([
      'Excavation',
      'Plumbing',
      'Electrical',
    ]),
    city: faker.address.city(),
  })
}

const output = path.join(__dirname, '..', 'data', 'companies.json')
fs.writeFileSync(output, JSON.stringify(data, null, '  '))
