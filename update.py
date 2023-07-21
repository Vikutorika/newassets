# update.py
import json

def update_version(package_file):
    with open(package_file, 'r', encoding='utf8') as f:
        data = json.load(f)

    version = data.get('version', '1.0.0')
    major, minor, patch = map(int, version.split('.'))
    patch += 1
    new_version = f"{major}.{minor}.{patch}"

    data['version'] = new_version

    with open(package_file, 'w', encoding='utf8') as f:
        json.dump(data, f, indent=2)

if __name__ == "__main__":
    package_file = "package.json"
    update_version(package_file)
