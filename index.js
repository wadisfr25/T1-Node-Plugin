import boxen from 'boxen';
import chalk from 'chalk';
import cowsay from 'cowsay';
import dayjs from 'dayjs';
import figlet from 'figlet';
import gradient from 'gradient-string';

const DEFAULT_PROFILE = {
  name: 'Nama Lengkap Kamu',
  nim: 'NIM Kamu',
  birthDate: '2004-01-01',
  character: 'dragon',
};

const [profileArg, birthDateArg, characterArg] = process.argv.slice(2);
const [nameInput, nimInput] = (profileArg ?? '').split(' - ').map((value) => value.trim());

const profile = {
  name: nameInput || DEFAULT_PROFILE.name,
  nim: nimInput || DEFAULT_PROFILE.nim,
  birthDate: birthDateArg || DEFAULT_PROFILE.birthDate,
  character: characterArg || DEFAULT_PROFILE.character,
};

const birthDate = dayjs(profile.birthDate);
const age = dayjs().diff(birthDate, 'year');
const displayedAge = birthDate.isValid() ? `${age} tahun` : 'Tanggal lahir belum valid';

const asciiName = figlet.textSync(profile.name, {
  font: 'Standard',
  horizontalLayout: 'default',
  verticalLayout: 'default',
});

const identity = [
  `${chalk.bold.green('Nama Lengkap')} : ${chalk.white(profile.name)}`,
  `${chalk.bold.blue('NIM')}          : ${chalk.white(profile.nim)}`,
  `${chalk.bold.magenta('Tanggal Lahir')}: ${chalk.white(profile.birthDate)}`,
  `${chalk.bold.yellow('Umur')}         : ${chalk.white(displayedAge)}`,
].join('\n');

const motivation = [
  `Halo ${profile.name}!`,
  'Tetap semangat belajar Node.js.',
  'Setiap error adalah sinyal untuk naik level.',
].join('\n');

console.log(gradient.pastel.multiline(asciiName));
console.log(
  boxen(identity, {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'cyan',
  }),
);

console.log(
  cowsay.say({
    text: chalk.yellowBright(motivation),
    e: '^^',
    T: 'U ',
    f: profile.character,
  }),
);

console.log(chalk.underline.gray('Contoh: npm start -- "Budi Santoso - 123456789" "2004-05-12" dragon'));
