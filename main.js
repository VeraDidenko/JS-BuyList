$(function (){
    var $list = $(".bl-list");
    var ONE_ROW_HTML = $(".row-template").html();
    var $left = $(".left-products");
    var ONE_PRODUCT_HTML = $(".left-product-template").html();
    var $bought = $(".bought-products");
    var ONE_BOUGHT_HTML = $(".bought-product-template").html();

    function addItem(title){
        var $node = $(ONE_ROW_HTML);
        var $node_left = $(ONE_PRODUCT_HTML);
        var $node_bought = $(ONE_BOUGHT_HTML);
        var canChange = true;

        var amount = 1;
        var $amount_label = $node.find(".bl-label");
        $amount_label.text(amount);
        var $amount_labelleft = $node_left.find(".bl-amount");
        $amount_labelleft.text(amount);
        var $amount_labelbought = $node_bought.find(".bl-bought-amount");
        $amount_labelbought.text(amount);

        $node.find(".bl-product").text(title);
        $node_left.find(".bl-name").text(title);
        $node_bought.find(".bl-bought-name").text(title);

        $node.find(".bl-plus").click(function () {
            amount += 1;
            $amount_label.text(amount);
            $amount_labelleft.text(amount);
            $amount_labelbought.text(amount);
            $node.find(".bl-minus").prop("disabled", false).css('opacity',1);
        });

        if (amount === 1){
            $node.find(".bl-minus").prop("disabled", true).css('opacity',0.5);
        }

        $node.find(".bl-minus").click(function() {
            if(amount > 1){
                amount -= 1;
                $amount_label.text(amount);
                $amount_labelleft.text(amount);
                $amount_labelbought.text(amount);
            }
            if (amount === 1){
                $node.find(".bl-minus").prop("disabled", true).css('opacity',0.5);
            }

        });

        $node.find(".bl-product").click(function(){
            if(canChange){
                $node.find(".bl-product").hide();
                $node.find(".edit-product").show().focus();
                $node.find(".edit-product").val(title);
                $node_left.find(".bl-name").val(title);
                $node_bought.find(".bl-bought-name").val(title);
            }

        });
        $node.find(".edit-product").focusout(function(){
            if(canChange){
                $node.find(".bl-product").show();
                $node.find(".edit-product").hide();
                title = $node.find(".edit-product").val();
                $node.find(".bl-product").text(title);
                $node_left.find(".bl-name").text(title);
                $node_bought.find(".bl-bought-name").text(title);
            }
        });

        $node.find(".bl-deletebutton").click(function() {
            $node.hide();
            $node_left.hide();
            $node_bought.hide();
        });

        $node.find(".bl-boughtbutton").click(function() {
            $node.addClass("is-bought");
            $node_left.hide();
            $bought.append($node_bought);
            $node_bought.show();
            canChange = false;
        });

        $node.find(".bl-notboughtbutton").click(function() {
            $node.removeClass("is-bought");
            $node_left.show();
            $node_bought.hide();
            canChange = true;

        });


        $list.append($node);
        $left.append($node_left);
    }
    addItem("Джекфрут");
    addItem("Апельсин");
    addItem("Карамбола");

    var $input = $(".bl-user");

    $(".bl-add").click(function(){
        var new_product = $input.val();
        if(new_product.trim()){
            addItem(new_product);
            $input.val("");
            $input.focus();

        }
    });
});