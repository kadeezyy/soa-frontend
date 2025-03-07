
export const fetchGetRoutesData = async (
    from,
    to,
    filters,
    chosenSortFields,
    offset,
    setRoutesList,
    setIsList
) => {
    try {
        const limit = "10"
        const sortBy = chosenSortFields;
        const url = new URL(`https://localhost:8443/route-management-service-1/routes`);

        const filterParams = JSON.stringify({
            locationIdFrom: from?.id,
            locationIdTo: to?.id,
            distanceFrom: filters.distance.from !== "" ? Number(filters.distance.from) : undefined,
            distanceTo: filters.distance.to !== "" ? Number(filters.distance.to) : undefined,
            name: filters.routeName.from !== "" ? filters.routeName.from : undefined,
            minX: filters.xLocation.from !== "" ? Number(filters.xLocation.from) : undefined,
            maxX: filters.xLocation.to !== "" ? Number(filters.xLocation.to) : undefined,
            minY: filters.yLocation.from !== "" ? Number(filters.yLocation.from) : undefined,
            maxY: filters.yLocation.to !== "" ? Number(filters.yLocation.to) : undefined,
            minZ: filters.zLocation.from !== "" ? Number(filters.zLocation.from) : undefined,
            maxZ: filters.zLocation.to !== "" ? Number(filters.zLocation.to) : undefined,
        });

        // Добавляем параметры сортировки и фильтрации
        sortBy.forEach((field) => {
            url.searchParams.append('sortBy', field);
        });
        url.searchParams.append('limit', limit);
        url.searchParams.append('offset', offset);

        const response = await fetch(
            url,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: filterParams
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch route data');
        }

        const data = await response.json();
        console.log(data);
        setRoutesList(data);
        setIsList(true);
    } catch (error) {
        console.error('Error fetching route data:', error);
    }
};