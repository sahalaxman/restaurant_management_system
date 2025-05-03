import json         ## json is used to storing my data in dictionary format.

with open('menu.json', 'r') as l:       ## .open() is used to open my json file in read mode.
    data = json.load(l)     ## .load() is used to load my all data which is store in l.

items = data.get('items', [])

while True:
    print('-' * 46)
    print("\tFoodWala Restaurant")
    print('-' * 46)
    print('1. SHOW MENU.')
    print('2. ORDER ITEMS.')
    print('3. ADD MENU.')
    print('4. EXIT.')
    print('-' * 46)

    choice = int(input("Enter your choice:- "))
    print("\n")
    
    if choice == 1:
        print('-' * 46)
        print('{:<5} {:<25} {:>10}'.format("ID", "NAME", "PRICE"))
        print('-' * 46)
        for item in items:
            print('{:<5} {:<25} {:>10}'.format(item["id"], item["name"], item["price"]))
        print('\n')

    elif choice == 2:

        item_orders = list(map(int,input("Which item you wnat to try today:-  ").split(",")))       ## The map() function in Python applies a given function to each item of an iterable (like a list or tuple)
        print('-' * 46)
        print('{:<5} {:<25} {:>10}'.format("ID", "NAME", "PRICE"))
        print('-' * 46)
        total_bill = 0

        for item_order in item_orders:
            for item in items:
                if item['id'] == item_order:
                    print('{:<5} {:<25} {:>10}'.format(item["id"], item["name"], item["price"]))
                    total_bill = total_bill + int(item["price"])
                    break
        
        print('-' * 46)
        print(f'\tTOTAL BILL IS:- {total_bill}')
        print('-' * 46)
        

    elif choice == 3:
        item_name = input("Enter the item name:- ")
        item_price = int(input("Enter the item price:- "))
        item_type = input("veg or non-veg:- ")

        items.append({      ## .append() is append the new items in my json file.
            "id": len(items) + 1,
            "name": item_name,
            "price": item_price,
            "veg": True if item_type == "veg" else False,
            "reviews": []
        })
        data["items"] = items
        with open("menu.json", 'w') as l:
            json.dump(data,l)       ## The json.dump() function in Python allows you to store JSON data directly into a file.
            print("\n")
        print('-' * 46)
        print("\tItem is added to the Menu..")
        print("\n")

    elif choice == 4:
        data["items"] = items
        with open("menu.json", 'w') as l:
            json.dump(data,l)
        print('-' * 46)
        print("THANK'S TO VISIT OUR RESTAURANT..")
        print('-' * 46)
        break

    else:
        print("Invalid choice. Please try again.\n")
